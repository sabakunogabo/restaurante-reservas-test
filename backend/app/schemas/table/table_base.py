from typing import Optional

from pydantic import BaseModel


class TableBase(BaseModel):
    number: int
    capacity: int
    location: Optional[str] = None
    is_active: bool = True
