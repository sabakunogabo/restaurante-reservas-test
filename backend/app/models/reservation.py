from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
from .timestamp_mixin import TimestampMixin


class Reservation(Base, TimestampMixin):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    table_id = Column(
        Integer, ForeignKey("tables.id", ondelete="RESTRICT"), nullable=False
    )
    reservation_date = Column(Date, nullable=False, index=True)
    reservation_time = Column(Time, nullable=False)
    duration_minutes = Column(Integer, default=90)
    status = Column(String(20), default="confirmed")
    special_requests = Column(String, nullable=True)
    deleted_at = Column(DateTime, nullable=True)

    customer = relationship("Customer", back_populates="reservations")
    table = relationship("Table", back_populates="reservations")
