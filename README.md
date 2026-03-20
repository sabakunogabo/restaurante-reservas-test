# 🍽️ Restaurant Reservation System

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Preact](https://img.shields.io/badge/Preact-10.19.2-673AB8?style=for-the-badge&logo=preact)](https://preactjs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)](https://postgresql.org)
[![Bun](https://img.shields.io/badge/Bun-1.0.18-000?style=for-the-badge&logo=bun)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Aplicación web completa para la gestión de reservas de un restaurante. Permite a los clientes reservar mesas, consultar disponibilidad, ver reservas del día y administrar mesas y clientes. Construida con **FastAPI** (backend), **Preact** (frontend), **Tailwind CSS**, **Zustand** y **PostgreSQL**. Sigue estándares profesionales, incluye validaciones, manejo de errores y una interfaz moderna con iconos.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
  - [Base de Datos](#base-de-datos)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Datos de Prueba](#datos-de-prueba)
- [Uso](#uso)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Solución de Problemas Comunes](#solución-de-problemas-comunes)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## ✨ Características

- **Reservas**: Los clientes pueden reservar mesas seleccionando fecha, hora y requerimientos especiales.
- **Disponibilidad**: Validación automática para evitar reservas duplicadas en la misma mesa y horario.
- **Clientes**: Creación automática de clientes si no existen (por email). También se puede administrar clientes.
- **Mesas**: CRUD completo de mesas con número único, capacidad y ubicación.
- **Reservas del día**: Listado detallado con opción de cancelar y ver detalles.
- **Interfaz moderna**: Diseño responsive con Tailwind CSS e iconos de Lucide.
- **Manejo de errores**: Mensajes claros al usuario y códigos HTTP apropiados (400, 404, 409, 500).
- **Persistencia**: Base de datos PostgreSQL con índices optimizados y restricciones de integridad.

---

## 🛠️ Tecnologías

### Backend

- **FastAPI** (framework web)
- **SQLAlchemy** (ORM)
- **Pydantic** (validación de datos)
- **Alembic** (migraciones)
- **PostgreSQL** (base de datos)
- **Uvicorn** (servidor ASGI)

### Frontend

- **Preact** (alternativa ligera a React)
- **TypeScript** (tipado estático)
- **Zustand** (manejo de estado)
- **React Hook Form** (validación de formularios)
- **TanStack Query** (para peticiones asíncronas)
- **Tailwind CSS** (estilos)
- **Lucide Preact** (iconos)
- **React Router DOM** (enrutamiento)
- **Axios** (cliente HTTP)
- **React Hot Toast** (notificaciones)
- **Vite** (bundler)

### Herramientas

- **Bun** (gestor de paquetes y runtime)
- **Git** (control de versiones)

---

## Estructura del Proyecto

```
restaurante-reservas/
├── backend/
│   ├── app/
│   │   ├── api/               # Endpoints (v1)
│   │   ├── core/              # Configuración, DB, excepciones
│   │   ├── models/             # Modelos SQLAlchemy
│   │   ├── repositories/       # Capa de acceso a datos
│   │   ├── schemas/            # Esquemas Pydantic
│   │   ├── services/           # Lógica de negocio
│   │   └── main.py             # Punto de entrada
│   ├── alembic/                # Migraciones (si se usa)
│   ├── requirements.txt
│   ├── .env.example            # Variables de entorno de ejemplo
│   └── run.py                   # Script para ejecutar con uvicorn
├── frontend/
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   │   ├── api/                # Cliente Axios y endpoints
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/               # Vistas principales
│   │   ├── store/               # Estado global (Zustand)
│   │   ├── types/               # Tipos TypeScript
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── .env.example              # Variables de entorno del frontend
├── database/
│   ├── schema.sql                # Creación de tablas
│   └── seed.sql                   # Datos de prueba
├── .gitignore
├── LICENSE
└── README.md                      # Este archivo
```

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                        Cliente                           │
│  (Navegador)                                             │
│  Preact + TypeScript + TailwindCSS + Zustand             │
│  Vite (dev server) / Bun runtime                         │
└───────────────────────────────────┬─────────────────────┘
                                    │ API REST (HTTP/JSON)
                                    ▼
┌─────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                   │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                     API Layer                        │ │
│  │  Routers (endpoints) + Middleware (CORS)            │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                  Service Layer                       │ │
│  │  Lógica de negocio (reservas, disponibilidad)       │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                 Repository Layer                     │ │
│  │  Acceso a datos (SQLAlchemy)                         │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                  Models (ORM)                        │ │
│  │  SQLAlchemy models                                   │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                  Schemas (DTO)                       │ │
│  │  Pydantic models (validación)                        │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                      Core                            │ │
│  │  Configuración, logging, DB session                  │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────┬─────────────────────┘
                                    │ SQL
                                    ▼
┌─────────────────────────────────────────────────────────┐
│                   PostgreSQL Database                    │
│  (tablas: customers, tables, reservations)               │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Requisitos Previos

- **Python** 3.10 o superior ([descargar](https://www.python.org/downloads/))
- **PostgreSQL** 15 o superior ([descargar](https://www.postgresql.org/download/windows/))
- **Bun** 1.0.18 o superior ([instrucciones](https://bun.sh/docs/installation)) (también puedes usar npm, pero se recomienda Bun)
- **Git** (opcional, para clonar)

Verifica las instalaciones:

```bash
python --version
psql --version
bun --version
```

---

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/sabakunogabo/restaurante-reservas-test.git
cd restaurante-reservas-test
```

### 2. Base de Datos

#### 2.1. Crear la base de datos

Abre **psql** (puedes usar pgAdmin o línea de comandos):

```bash
psql -U postgres
```

Dentro de psql, ejecuta:

```sql
CREATE DATABASE restaurant_db;
\q
```

#### 2.2. Ejecutar el script de esquema

Desde la terminal (fuera de psql), ejecuta:

```bash
psql -U postgres -d restaurant_db -f database/schema.sql
```

(Se te pedirá la contraseña del usuario postgres).

#### 2.3. (Opcional) Cargar datos de prueba

```bash
psql -U postgres -d restaurant_db -f database/seed.sql
```

### 3. Backend (FastAPI)

```bash
cd backend
```

#### 3.1. Crear y activar entorno virtual

```bash
python -m venv venv
venv\Scripts\activate      # En Windows
# source venv/bin/activate  # En Linux/Mac
```

#### 3.2. Instalar dependencias

```bash
pip install -r requirements.txt
```

#### 3.3. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
copy .env.example .env     # En Windows
# cp .env.example .env     # En Linux/Mac
```

Edita `.env` con tus credenciales de PostgreSQL. Ejemplo:

```env
DATABASE_URL=postgresql://postgres:tu_contraseña@localhost:5432/restaurant_db
```

#### 3.4. Ejecutar migraciones (si usas Alembic)

Si prefieres usar Alembic en lugar del script SQL, ejecuta:

```bash
alembic upgrade head
```

#### 3.5. Iniciar el servidor

```bash
python run.py
```

O directamente con uvicorn:

```bash
uvicorn app.main:app --reload
```

El backend estará disponible en `http://localhost:8000`. La documentación interactiva de la API estará en `http://localhost:8000/docs`.

### 4. Frontend (Preact + Vite)

Abre una nueva terminal (mantén el backend corriendo) y ve a la carpeta frontend:

```bash
cd ../frontend
```

#### 4.1. Instalar dependencias con Bun

```bash
bun install
```

#### 4.2. Configurar variable de entorno (opcional)

Crea un archivo `.env` en la raíz del frontend:

```bash
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env
```

#### 4.3. Iniciar el servidor de desarrollo

```bash
bun run dev
```

El frontend se abrirá en `http://localhost:5173` (generalmente).

---

## Datos de Prueba

El archivo `database/seed.sql` inserta:

- 5 mesas con diferentes capacidades y ubicaciones.
- 3 clientes de ejemplo.
- Algunas reservas para hoy y mañana (ajusta las fechas si es necesario).

Si deseas más datos, puedes modificar el script o usar la interfaz de la aplicación para crear clientes y reservas.

---

## Uso

1. Abre el frontend en `http://localhost:5173`.
2. En la página principal, completa el formulario para hacer una reserva. Los datos del cliente se crearán automáticamente si no existen.
3. Ve a **Reservas del día** para ver las reservas de una fecha específica. Puedes cancelar reservas o ver detalles.
4. En **Mesas** puedes crear, editar o eliminar mesas (solo si no tienen reservas futuras).
5. En **Clientes** puedes listar y crear nuevos clientes.

---

## Capturas de Pantalla

| Pantalla principal            | Reservas del día                |
| ----------------------------- | ------------------------------- |
| ![Home](screenshots/home.png) | ![Daily](screenshots/daily.png) |

| Gestión de mesas                  | Listado de clientes                     |
| --------------------------------- | --------------------------------------- |
| ![Tables](screenshots/tables.png) | ![Customers](screenshots/customers.png) |

| Detalle reserva                   | Cancelar Reserva                     |
| --------------------------------- | ------------------------------------ |
| ![Tables](screenshots/detail.png) | ![Customers](screenshots/cancel.png) |

---

## Solución de Problemas Comunes

### Error de conexión a la base de datos

- Verifica que PostgreSQL esté corriendo (puedes usar `services.msc` en Windows o `pg_isready`).
- Comprueba las credenciales en `.env`.
- Asegúrate de que la base de datos `restaurant_db` exista.

### Error CORS en el frontend

- El backend debe tener configurado CORS para `http://localhost:5173`. Revisa `app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Error 500 al eliminar mesa con reservas

- El servicio `delete_table` verifica si hay reservas futuras. Si la mesa tiene reservas para hoy o después, no se puede eliminar. Cancela primero esas reservas.

### El backend no encuentra el módulo `app`

- Ejecuta los comandos desde la carpeta `backend` (donde está `run.py`). No desde la raíz.

### Al hacer `bun install` da error de node-gyp en Windows

- Instala Windows Build Tools: abre PowerShell como administrador y ejecuta:
  ```bash
  npm install --global windows-build-tools
  ```

### El puerto 8000 ya está en uso

- Cambia el puerto en `run.py` o usa `uvicorn app.main:app --reload --port 8001`.

---

## ✨ Créditos

Desarrollado por [Gabriel Alvarez](https://github.com/sabakunogabo) como proyecto de demostrativo.
