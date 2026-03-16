from datetime import datetime
from typing import Optional

from pydantic import ConfigDict

from app.schemas.customer import CustomerBase


class CustomerResponse(CustomerBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)
