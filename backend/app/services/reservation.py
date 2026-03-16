from app.models.reservation import Reservation
from app.repositories import CustomerRepository, ReservationRepository, TableRepository

from app.core.exceptions import NotFoundError, ConflictError
from sqlalchemy.orm import Session
from datetime import date, datetime
from typing import List

from app.schemas.reservation.reservation_create import ReservationCreate
from app.schemas.reservation.reservation_update import ReservationUpdate
from app.schemas.reservation.reservation_with_customer_create import (
    ReservationWithCustomerCreate,
)


class ReservationService:
    def __init__(self, db: Session):
        self.db = db
        self.reservation_repo = ReservationRepository(db)
        self.table_repo = TableRepository(db)
        self.customer_repo = CustomerRepository(db)

    def get(self, reservation_id: int) -> Reservation:
        reservation = self.repo.get(reservation_id)
        if not reservation or reservation.deleted_at:
            raise NotFoundError("Reservation not found")
        return reservation

    def get_all(self, skip: int = 0, limit: int = 100) -> List[Reservation]:
        return self.repo.get_multi(skip, limit)

    def get_by_date(self, reservation_date: date) -> List[Reservation]:
        return self.repo.get_by_date(reservation_date)

    def get_today(self) -> List[Reservation]:
        return self.repo.get_today()

    def create(self, reservation_in: ReservationCreate) -> Reservation:
        customer = self.customer_repo.get(reservation_in.customer_id)
        if not customer or customer.deleted_at:
            raise NotFoundError("Customer not found")

        table = self.table_repo.get(reservation_in.table_id)
        if not table or not table.is_active:
            raise NotFoundError("Table not found or inactive")

        if self.repo.check_conflict(
            table_id=reservation_in.table_id,
            res_date=reservation_in.reservation_date,
            res_time=reservation_in.reservation_time,
            duration=reservation_in.duration_minutes,
        ):
            raise ConflictError("Table already reserved at that time")

        return self.repo.create(reservation_in)

    def update(
        self, reservation_id: int, reservation_in: ReservationUpdate
    ) -> Reservation:
        reservation = self.get(reservation_id)

        table_id = (
            reservation_in.table_id
            if reservation_in.table_id is not None
            else reservation.table_id
        )
        res_date = (
            reservation_in.reservation_date
            if reservation_in.reservation_date is not None
            else reservation.reservation_date
        )
        res_time = (
            reservation_in.reservation_time
            if reservation_in.reservation_time is not None
            else reservation.reservation_time
        )
        duration = (
            reservation_in.duration_minutes
            if reservation_in.duration_minutes is not None
            else reservation.duration_minutes
        )

        if reservation_in.table_id is not None:
            table = self.table_repo.get(reservation_in.table_id)
            if not table or not table.is_active:
                raise NotFoundError("Table not found or inactive")

        if self.repo.check_conflict(
            table_id=table_id,
            res_date=res_date,
            res_time=res_time,
            duration=duration,
            exclude_id=reservation_id,
        ):
            raise ConflictError("Table already reserved at that time")

        return self.repo.update(reservation, reservation_in)

    def delete(self, reservation_id: int) -> None:
        reservation = self.get(reservation_id)
        reservation.deleted_at = datetime.now()
        self.repo.db.commit()

    def create_reservation_with_customer(self, data: ReservationWithCustomerCreate):
        customer = self.customer_repo.get_by_email(data.customer_email)
        if not customer:
            customer_data = {
                "name": data.customer_name,
                "email": data.customer_email,
                "phone": data.customer_phone,
            }
            customer = self.customer_repo.create(customer_data)

        table = self.table_repo.get(data.table_id)
        if not table or not table.is_active:
            raise NotFoundError("Mesa no disponible")

        if self.reservation_repo.check_conflict(
            data.table_id, data.reservation_date, data.reservation_time
        ):
            raise ConflictError("La mesa ya está reservada para esa fecha y hora")

        reservation_data = data.model_dump(
            exclude={"customer_name", "customer_email", "customer_phone"}
        )
        reservation_data["customer_id"] = customer.id
        return self.reservation_repo.create(reservation_data)

    def get_todays_reservations(self, date):
        return self.reservation_repo.get_by_date(date)

    def get_reservation_by_id(self, reservation_id: int):
        reservation = self.reservation_repo.get(reservation_id)
        if reservation:
            self.db.refresh(reservation, ["customer", "table"])
        return reservation

    def cancel_reservation(self, reservation_id: int):
        reservation = self.reservation_repo.get(reservation_id)
        if not reservation:
            raise NotFoundError("Reserva no encontrada")
        return self.reservation_repo.delete(reservation_id)

    def update_reservation(self, reservation_id: int, data: ReservationUpdate):
        reservation = self.reservation_repo.get(reservation_id)
        if not reservation:
            raise NotFoundError("Reserva no encontrada")

        update_data = data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(reservation, key, value)

        self.db.commit()
        self.db.refresh(reservation)
        return reservation
