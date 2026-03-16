from pydantic import ConfigDict

from app.schemas.table.table_base import TableBase


class TableResponse(TableBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
