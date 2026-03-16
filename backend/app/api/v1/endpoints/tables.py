from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ....schemas.table import TableCreate, TableResponse
from ....services.table import TableService
from ....api.dependencies import get_db
from ....core.exceptions import NotFoundError

router = APIRouter(prefix="/tables", tags=["tables"])


@router.post(
    "/",
    response_model=TableResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Crear mesa",
    description="""
Registra una nueva mesa en el sistema del restaurante.

La mesa queda disponible para ser utilizada en futuras reservas.

### Reglas de negocio
- El número de mesa debe ser único dentro del restaurante.
- La capacidad debe ser mayor a **0**.
- El estado inicial de la mesa es **disponible**.

### Respuestas
- **201 Created**: mesa creada correctamente.
- **400 Bad Request**: datos inválidos.
- **409 Conflict**: ya existe una mesa con el mismo número.
""",
)
def create_table(table: TableCreate, db: Session = Depends(get_db)):
    service = TableService(db)
    return service.create_table(table)


@router.get(
    "/",
    response_model=List[TableResponse],
    summary="Listar mesas",
    description="""
Obtiene el listado de mesas registradas en el sistema.

Permite paginar los resultados para optimizar el consumo de la API.

### Parámetros
- **skip**: número de registros a omitir (offset).
- **limit**: cantidad máxima de registros a retornar.

### Casos de uso
- Panel administrativo.
- Selección de mesa al crear una reserva.

### Respuestas
- **200 OK**: listado obtenido correctamente.
""",
)
def get_tables(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    service = TableService(db)
    return service.get_all_tables(skip=skip, limit=limit)


@router.get(
    "/{table_id}",
    response_model=TableResponse,
    summary="Obtener mesa",
    description="""
Recupera la información de una mesa específica mediante su identificador.

### Casos de uso
- Consultar detalles de una mesa.
- Validar disponibilidad antes de crear una reserva.

### Respuestas
- **200 OK**: mesa encontrada.
- **404 Not Found**: la mesa no existe.
""",
)
def get_table(table_id: int, db: Session = Depends(get_db)):
    service = TableService(db)
    try:
        return service.get_table_by_id(table_id)
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.put(
    "/{table_id}",
    response_model=TableResponse,
    summary="Actualizar mesa",
    description="""
Actualiza la información de una mesa existente.

### Campos actualizables
- **number**: número de mesa.
- **capacity**: capacidad de personas.
- **status**: estado de la mesa (ej. disponible, ocupada, inactiva).

### Reglas de negocio
- La mesa debe existir.
- El número de mesa debe seguir siendo único.

### Respuestas
- **200 OK**: mesa actualizada correctamente.
- **404 Not Found**: mesa no encontrada.
- **409 Conflict**: número de mesa duplicado.
""",
)
def update_table(table_id: int, table: TableCreate, db: Session = Depends(get_db)):
    service = TableService(db)
    try:
        return service.update_table(table_id, table.model_dump())
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.delete(
    "/{table_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Eliminar mesa",
    description="""
Elimina una mesa del sistema.

### Consideraciones

- La mesa debe existir.
- No debería eliminarse si tiene reservas activas.

### Respuesta

Retorna **204 No Content** si la operación fue exitosa.
""",
)
def delete_table(table_id: int, db: Session = Depends(get_db)):
    service = TableService(db)
    try:
        return service.delete_table(table_id)
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
