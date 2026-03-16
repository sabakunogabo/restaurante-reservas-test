from datetime import date, datetime, time
from typing import Optional

from pydantic import BaseModel


class ReservationResponse(BaseModel):
    id: int
    customer_id: int
    table_id: int
    reservation_date: date
    reservation_time: time
    special_requests: Optional[str]
    status: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
