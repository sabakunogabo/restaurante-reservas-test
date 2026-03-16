from fastapi import HTTPException, status


class ConflictError(HTTPException):
    def __init__(self, detail: str = "Conflicto en la solicitud"):
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail=detail)
