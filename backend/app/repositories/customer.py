from sqlalchemy.orm import Session
from ..models.customer import Customer
from ..schemas.customer import CustomerCreate, CustomerUpdate
from .base import BaseRepository

class CustomerRepository(BaseRepository[Customer, CustomerCreate, CustomerUpdate]):
    def __init__(self, db: Session):
        super().__init__(Customer, db)

    def get_by_email(self, email: str) -> Customer | None:
        return self.db.query(Customer).filter(Customer.email == email).first()