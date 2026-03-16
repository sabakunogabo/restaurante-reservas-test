from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base
from .timestamp_mixin import TimestampMixin

class Table(Base, TimestampMixin):
    __tablename__ = "tables"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(Integer, unique=True, nullable=False)
    capacity = Column(Integer, nullable=False)
    location = Column(String(50))
    is_active = Column(Boolean, default=True)

    reservations = relationship("Reservation", back_populates="table")