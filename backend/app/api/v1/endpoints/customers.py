from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.customer import CustomerCreate, CustomerResponse, CustomerUpdate
from app.services.customer import CustomerService
from app.api.dependencies import get_db
from app.core.exceptions import ConflictError
from app.core.exceptions.not_found_error import NotFoundError

router = APIRouter(prefix="/customers", tags=["customers"])


@router.post("/", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo cliente.

    Parameters
    ----------
    customer : CustomerCreate
        Datos del cliente a crear (nombre, email, etc.).
    db : Session, optional
        Sesión de base de datos (inyectada automáticamente).

    Returns
    -------
    CustomerResponse
        Cliente creado con su ID asignado.

    Raises
    ------
    HTTPException 409 Conflict
        Si ya existe un cliente con el mismo email o documento.
    """
    service = CustomerService(db)
    try:
        return service.create_customer(customer)
    except ConflictError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.get("", response_model=List[CustomerResponse])
def get_customers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Obtiene una lista paginada de clientes.

    Parameters
    ----------
    skip : int, default=0
        Número de registros a saltar (para paginación).
    limit : int, default=100
        Cantidad máxima de registros a retornar.
    db : Session, optional
        Sesión de base de datos (inyectada automáticamente).

    Returns
    -------
    List[CustomerResponse]
        Lista de clientes.
    """
    service = CustomerService(db)
    return service.get_all_customers(skip=skip, limit=limit)


@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    """
    Obtiene un cliente por su ID.

    Parameters
    ----------
    customer_id : int
        Identificador único del cliente.
    db : Session, optional
        Sesión de base de datos (inyectada automáticamente).

    Returns
    -------
    CustomerResponse
        Datos del cliente solicitado.

    Raises
    ------
    HTTPException 404 Not Found
        Si no existe un cliente con el ID proporcionado.
    """
    service = CustomerService(db)
    customer = service.get_customer_by_id(customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return customer


@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(
    customer_id: int, customer: CustomerUpdate, db: Session = Depends(get_db)
):
    """
    Actualiza un cliente existente.

    Parameters
    ----------
    customer_id : int
        ID del cliente a actualizar.
    customer : CustomerUpdate
        Datos a modificar (soportan actualización parcial).
    db : Session, optional
        Sesión de base de datos (inyectada automáticamente).

    Returns
    -------
    CustomerResponse
        Cliente actualizado.

    Raises
    ------
    HTTPException 404 Not Found
        Si no existe un cliente con el ID proporcionado.
    HTTPException 409 Conflict
        Si la actualización genera un conflicto (email duplicado, etc.).
    """
    service = CustomerService(db)
    try:
        return service.update_customer(customer_id, customer)
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except ConflictError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    """
    Elimina un cliente por su ID.

    Parameters
    ----------
    customer_id : int
        ID del cliente a eliminar.
    db : Session, optional
        Sesión de base de datos (inyectada automáticamente).

    Returns
    -------
    None
        La respuesta tiene código 204 (sin contenido).

    Raises
    ------
    HTTPException 404 Not Found
        Si no existe un cliente con el ID proporcionado.
    """
    service = CustomerService(db)
    try:
        service.delete_customer(customer_id)
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    return None
