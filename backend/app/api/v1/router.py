from fastapi import APIRouter
from .endpoints import reservations, customers, tables

router = APIRouter(prefix="/api/v1")
router.include_router(reservations.router)
router.include_router(customers.router)
router.include_router(tables.router)