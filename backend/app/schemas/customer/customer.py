from datetime import datetime
from typing import Optional

from app.schemas.customer import CustomerResponse


class Customer(CustomerResponse):
    deleted_at: Optional[datetime] = None
