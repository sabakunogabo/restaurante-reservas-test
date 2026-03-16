from typing import Optional

from ...schemas.customer import CustomerResponse
from ...schemas.reservation.reservation_response import ReservationResponse
from ...schemas.table import TableResponse


class ReservationWithDetails(ReservationResponse):
    customer: Optional["CustomerResponse"] = None
    table: Optional["TableResponse"] = None
