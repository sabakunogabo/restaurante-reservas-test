from typing import Optional

from app.schemas.table.table_base import TableBase


class TableUpdate(TableBase):
    number: Optional[int] = None
    capacity: Optional[int] = None
    location: Optional[str] = None
    is_active: Optional[bool] = None
