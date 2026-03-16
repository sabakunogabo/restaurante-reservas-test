from typing import Optional

from pydantic import EmailStr, Field

from app.schemas.customer import CustomerBase


class CustomerUpdate(CustomerBase):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, min_length=7, max_length=20)
