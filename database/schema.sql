CREATE DATABASE restaurant_reservations_db;

-- Creación de secuencias
CREATE SEQUENCE IF NOT EXISTS customers_id_seq;
CREATE SEQUENCE IF NOT EXISTS reservations_id_seq;
CREATE SEQUENCE IF NOT EXISTS tables_id_seq;

-- Tabla customers
CREATE TABLE customers (
    id INTEGER DEFAULT nextval('customers_id_seq'::regclass) NOT NULL,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP WITHOUT TIME ZONE
);

-- Tabla tables
CREATE TABLE tables (
    id INTEGER DEFAULT nextval('tables_id_seq'::regclass) NOT NULL,
    number INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    location VARCHAR,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabla reservations
CREATE TABLE reservations (
    id INTEGER DEFAULT nextval('reservations_id_seq'::regclass) NOT NULL,
    customer_id INTEGER NOT NULL,
    table_id INTEGER,
    reservation_date DATE NOT NULL,
    reservation_time TIME WITHOUT TIME ZONE NOT NULL,
    special_requests VARCHAR,
    status VARCHAR DEFAULT 'confirmed'::character varying,
    duration_minutes INTEGER DEFAULT 90,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE reporte_meta (
    seccion TEXT,
    nombre TEXT,
    detalle TEXT
);

-- Índices y claves primarias
ALTER TABLE ONLY customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);

ALTER TABLE ONLY tables
    ADD CONSTRAINT tables_pkey PRIMARY KEY (id);

ALTER TABLE ONLY reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);

-- Índices únicos
CREATE UNIQUE INDEX ix_customers_email ON customers USING btree (email);
CREATE UNIQUE INDEX tables_number_key ON tables USING btree (number);
CREATE UNIQUE INDEX alembic_version_pkc ON alembic_version USING btree (version_num); -- porque se usa alembic

-- Otros índices
CREATE INDEX ix_customers_id ON customers USING btree (id);
CREATE INDEX ix_reservations_id ON reservations USING btree (id);
CREATE INDEX ix_reservations_reservation_date ON reservations USING btree (reservation_date);
CREATE INDEX ix_tables_id ON tables USING btree (id);

-- Llaves foráneas
ALTER TABLE ONLY reservations
    ADD CONSTRAINT reservations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT;

ALTER TABLE ONLY reservations
    ADD CONSTRAINT reservations_table_id_fkey FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE RESTRICT;
    