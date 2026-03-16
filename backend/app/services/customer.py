from datetime import datetime

from sqlalchemy.orm import Session
from app.repositories.customer import CustomerRepository
from app.schemas.customer import CustomerCreate
from app.core.exceptions import ConflictError
from app.core.exceptions.not_found_error import NotFoundError
from app.schemas.customer import CustomerUpdate


class CustomerService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = CustomerRepository(db)

    def create_customer(self, customer_data: CustomerCreate):
        existing = self.repo.get_by_email(customer_data.email)
        if existing:
            raise ConflictError("Ya existe un cliente con ese email")
        return self.repo.create(customer_data)

    def get_customer_by_id(self, customer_id: int):
        return self.repo.get(customer_id)

    def get_all_customers(self, skip: int = 0, limit: int = 100):
        return self.repo.get_all(skip=skip, limit=limit)

    def update_customer(self, customer_id: int, customer_data: CustomerUpdate):
        customer = self.repo.get(customer_id)
        if not customer:
            raise NotFoundError("Cliente no encontrado")

        if customer_data.email and customer_data.email != customer.email:
            existing = self.repo.get_by_email(customer_data.email)
            if existing:
                raise ConflictError("Ya existe un cliente con ese email")

        update_data = customer_data.model_dump(exclude_unset=True)
        return self.repo.update(customer_id, **update_data)

    def delete_customer(self, customer_id: int):
        customer = self.repo.get(customer_id)
        if not customer:
            raise NotFoundError("Cliente no encontrado")

        customer.deleted_at = datetime.now()
        self.db.commit()
