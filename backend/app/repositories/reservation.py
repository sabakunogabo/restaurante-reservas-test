from sqlalchemy.orm import Session
from app.schemas.reservation.reservation_create import ReservationCreate
from app.schemas.reservation.reservation_update import ReservationUpdate
from app.models.reservation import Reservation
from .base import BaseRepository


class ReservationRepository(
    BaseRepository[Reservation, ReservationCreate, ReservationUpdate]
):
    def __init__(self, db: Session):
        super().__init__(Reservation, db)

    def get_by_date(self, date):
        return (
            self.db.query(Reservation)
            .filter(Reservation.reservation_date == date)
            .all()
        )

    def check_conflict(self, table_id, date, time):
        return (
            self.db.query(Reservation)
            .filter(
                Reservation.table_id == table_id,
                Reservation.reservation_date == date,
                Reservation.reservation_time == time,
                Reservation.status == "confirmed",
            )
            .first()
            is not None
        )

    def check_conflict_excluding_self(self, table_id, date, time, exclude_id):
        return (
            self.db.query(Reservation)
            .filter(
                Reservation.table_id == table_id,
                Reservation.reservation_date == date,
                Reservation.reservation_time == time,
                Reservation.status.in_(["confirmed"]),
                Reservation.id != exclude_id,
            )
            .first()
            is not None
        )
