from datetime import date, time

from pydantic import BaseModel, EmailStr, field_validator


class ReservationWithCustomerCreate(BaseModel):

    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    table_id: int
    reservation_date: date
    reservation_time: time
    special_requests: str | None = None

    @field_validator("customer_phone")
    def validate_phone(cls, v:str) -> str:
        if len(v) < 7:
            raise ValueError("El teléfono debe tener al menos 7 caracteres")
        return v

    @field_validator("reservation_date")
    def validate_date(cls, v:date) -> date:
        from datetime import date
        if v < date.today():
            raise ValueError("La fecha de reserva no puede ser en el pasado")
        return v
