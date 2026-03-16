from datetime import date, time
from typing import Optional

from pydantic import BaseModel, field_validator


class ReservationUpdate(BaseModel):
    table_id: Optional[int] = None
    reservation_date: Optional[date] = None
    reservation_time: Optional[time] = None
    special_requests: Optional[str] = None
    status: Optional[str] = None

    # Validador para que la fecha no esté en el pasado
    @field_validator("reservation_date")
    def validate_future_date(cls, v):
        if v is not None and v < date.today():
            raise ValueError("La fecha de reserva no puede ser en el pasado")
        return v
