from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date
from typing import List

from app.schemas.reservation.reservation_response import ReservationResponse
from app.schemas.reservation.reservation_with_customer_create import (
    ReservationWithCustomerCreate,
)
from app.schemas.reservation.reservation_with_details import (
    ReservationWithDetails,
)

from app.services.reservation import ReservationService
from app.api.dependencies import get_db
from app.core.exceptions import NotFoundError, ConflictError
from app.schemas.reservation.reservation_update import ReservationUpdate

router = APIRouter(prefix="/reservations", tags=["reservations"])


@router.post(
    "/",
    response_model=ReservationResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Crear una nueva reserva",
    description="""
Crea una reserva para una mesa en una fecha y hora específicas.

Flujo del proceso:

1. Se valida la información enviada.
2. Se verifica si el cliente ya existe en el sistema.
3. Si el cliente no existe, se crea automáticamente.
4. Se valida la disponibilidad de la mesa en el horario solicitado.
5. Si la mesa está disponible, se registra la reserva en la base de datos.

Este endpoint garantiza integridad de datos y evita reservas duplicadas en el mismo horario.
""",
)
def create_reservation(
    reservation: ReservationWithCustomerCreate, db: Session = Depends(get_db)
):
    service = ReservationService(db)
    try:
        return service.create_reservation_with_customer(reservation)
    except (NotFoundError, ConflictError) as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.get(
    "/daily/{date}",
    response_model=List[ReservationWithDetails],
    summary="Obtener reservas de una fecha",
    description="""
Retorna todas las reservas registradas para una fecha específica.

Incluye información detallada de:
- cliente
- mesa
- número de personas
- requerimientos especiales

Se utiliza principalmente para visualizar la operación diaria del restaurante.
""",
)
def get_daily_reservations(date: date, db: Session = Depends(get_db)):
    service = ReservationService(db)
    reservations = service.get_todays_reservations(date)
    for r in reservations:
        db.refresh(r, ["customer", "table"])
    return reservations


@router.get(
    "/{reservation_id}",
    response_model=ReservationWithDetails,
    summary="Obtener reserva por ID",
    description="""
Obtiene la información completa de una reserva utilizando su identificador único.

Retorna los datos de:
- cliente
- mesa
- fecha y hora
- estado de la reserva
""",
)
def get_reservation(reservation_id: int, db: Session = Depends(get_db)):
    service = ReservationService(db)
    reservation = service.get_reservation_by_id(reservation_id)
    if not reservation:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reservation


@router.delete(
    "/{reservation_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Cancelar reserva",
    description="""
Cancela una reserva existente utilizando su identificador.

Si la reserva no existe se retorna un error 404.

Este endpoint no retorna contenido en la respuesta.
""",
)
def cancel_reservation(reservation_id: int, db: Session = Depends(get_db)):
    service = ReservationService(db)
    try:
        service.cancel_reservation(reservation_id)
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    return None


@router.put("/{reservation_id}", response_model=ReservationResponse)
def update_reservation(
    reservation_id: int,
    reservation_update: ReservationUpdate,
    db: Session = Depends(get_db),
):
    service = ReservationService(db)
    try:
        updated = service.update_reservation(reservation_id, reservation_update)
        return updated
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except ConflictError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
