from sqlalchemy.orm import Session
from ..models.table import Table
from ..schemas.table import TableCreate, TableUpdate
from .base import BaseRepository

class TableRepository(BaseRepository[Table, TableCreate, TableUpdate]):
    def __init__(self, db: Session):
        super().__init__(Table, db)