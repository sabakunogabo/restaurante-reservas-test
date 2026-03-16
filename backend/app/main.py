from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1.router import router as v1_router
from .core.database import engine, Base

# Crear tablas (solo para desarrollo)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Restaurant Reservations API")

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router)