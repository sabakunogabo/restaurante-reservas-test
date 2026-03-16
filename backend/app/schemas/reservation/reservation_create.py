from datetime import date, time
from typing import Optional

from pydantic import BaseModel


class ReservationCreate(BaseModel):
    customer_id: int
    table_id: int
    reservation_date: date
    reservation_time: time
    special_requests: Optional[str] = None
    status: str = "confirmed"