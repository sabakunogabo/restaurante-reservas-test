from datetime import date

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.core.exceptions.conflict_error import ConflictError
from app.repositories.table import TableRepository
from app.schemas.table import TableCreate
from app.core.exceptions import NotFoundError
from app.models.reservation import Reservation


class TableService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = TableRepository(db)

    def create_table(self, table_data: TableCreate):
        try:
            return self.repo.create(table_data.model_dump())
        except IntegrityError as e:

            if e.orig.pgcode == "23505":
                raise ConflictError("Ya existe una mesa con ese número")
            else:
                raise e

    def get_table_by_id(self, table_id: int):
        table = self.repo.get(table_id)
        if not table:
            raise NotFoundError("Mesa no encontrada")
        return table

    def get_all_tables(self, skip: int = 0, limit: int = 100):
        return self.repo.get_all(skip=skip, limit=limit)

    def update_table(self, table_id: int, table_data: dict):

        return self.repo.update(table_id, **table_data)

    def delete_table(self, table_id: int):
        table = self.repo.get(table_id)
        if not table:
            raise NotFoundError("Mesa no encontrada")

        from ..models.reservation import Reservation

        existing_reservation = (
            self.db.query(Reservation)
            .filter(
                Reservation.table_id == table_id,
                Reservation.status.in_(["confirmed", "pending"]),
            )
            .first()
        )
        if existing_reservation:
            raise ConflictError(
                "No se puede eliminar una mesa que tiene reservas activas"
            )

        return self.repo.delete(table_id)
