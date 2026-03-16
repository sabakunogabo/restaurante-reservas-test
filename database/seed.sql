-- =====================================================
-- DATOS DE PRUEBA PARA RESTAURANTE
-- =====================================================

-- Limpiar datos existentes (opcional, para empezar desde cero)
-- TRUNCATE TABLE reservations, customers, tables RESTART IDENTITY CASCADE;

-- =====================================================
-- TABLAS (mesas)
-- =====================================================
INSERT INTO tables (number, capacity, location, is_active, created_at, updated_at)
VALUES
  (1, 2, 'Interior', true, NOW(), NOW()),
  (2, 4, 'Terraza', true, NOW(), NOW()),
  (3, 4, 'Interior', true, NOW(), NOW()),
  (4, 6, 'VIP', true, NOW(), NOW()),
  (5, 8, 'Terraza', true, NOW(), NOW()),
  (6, 2, 'Barra', true, NOW(), NOW()),
  (7, 4, 'Interior', false, NOW(), NOW()),   -- mesa inactiva (no debería reservarse)
  (8, 10, 'Privado', true, NOW(), NOW());

-- =====================================================
-- CLIENTES
-- =====================================================
INSERT INTO customers (name, email, phone, created_at, updated_at)
VALUES
  ('Juan Pérez', 'juan.perez@email.com', '555-1234', NOW(), NOW()),
  ('María García', 'maria.garcia@email.com', '555-5678', NOW(), NOW()),
  ('Carlos López', 'carlos.lopez@email.com', '555-9012', NOW(), NOW()),
  ('Ana Martínez', 'ana.martinez@email.com', '555-3456', NOW(), NOW()),
  ('Pedro Rodríguez', 'pedro.rodriguez@email.com', '555-7890', NOW(), NOW()),
  ('Laura Sánchez', 'laura.sanchez@email.com', '555-2345', NOW(), NOW()),
  ('Miguel Fernández', 'miguel.fernandez@email.com', '555-6789', NOW(), NOW()),
  ('Sofía Díaz', 'sofia.diaz@email.com', '555-0123', NOW(), NOW()),
  ('Javier Gómez', 'javier.gomez@email.com', '555-4567', NOW(), NOW()),
  ('Elena Ruiz', 'elena.ruiz@email.com', '555-8901', NOW(), NOW());

-- =====================================================
-- RESERVAS
-- =====================================================
-- Fecha de hoy (para probar el listado diario)
-- Usamos CURRENT_DATE para que siempre sea dinámico
INSERT INTO reservations (customer_id, table_id, reservation_date, reservation_time, special_requests, status, duration_minutes, created_at, updated_at)
VALUES
  -- Reservas para HOY
  (1, 1, CURRENT_DATE, '13:00:00', 'Mesa cerca de la ventana', 'confirmed', 90, NOW(), NOW()),
  (2, 2, CURRENT_DATE, '14:30:00', 'Celebración de aniversario', 'confirmed', 120, NOW(), NOW()),
  (3, 3, CURRENT_DATE, '20:00:00', NULL, 'confirmed', 90, NOW(), NOW()),
  (4, 4, CURRENT_DATE, '21:30:00', 'Alergia al gluten', 'confirmed', 120, NOW(), NOW()),
  (5, 5, CURRENT_DATE, '13:30:00', 'Silla para bebé', 'confirmed', 90, NOW(), NOW()),
  (6, 6, CURRENT_DATE, '19:00:00', NULL, 'confirmed', 60, NOW(), NOW()),
  
  -- Reservas para MAÑANA
  (7, 1, CURRENT_DATE + 1, '14:00:00', NULL, 'confirmed', 90, NOW(), NOW()),
  (8, 2, CURRENT_DATE + 1, '15:00:00', 'Mesa tranquila', 'confirmed', 90, NOW(), NOW()),
  (9, 3, CURRENT_DATE + 1, '20:30:00', 'Postre sorpresa', 'confirmed', 120, NOW(), NOW()),
  (10, 4, CURRENT_DATE + 1, '21:00:00', NULL, 'confirmed', 90, NOW(), NOW()),
  
  -- Reservas para DÍAS PASADOS (para probar consultas históricas)
  (1, 2, CURRENT_DATE - 1, '13:00:00', NULL, 'completed', 90, NOW(), NOW()),
  (2, 3, CURRENT_DATE - 2, '20:00:00', 'Mesa para fumadores (terraza)', 'completed', 90, NOW(), NOW()),
  (3, 4, CURRENT_DATE - 3, '21:30:00', 'Aniversario', 'completed', 120, NOW(), NOW()),
  
  -- Reservas CANCELADAS
  (4, 5, CURRENT_DATE + 2, '14:00:00', NULL, 'cancelled', 90, NOW(), NOW()),
  (5, 6, CURRENT_DATE + 3, '19:30:00', 'Cancelada por cliente', 'cancelled', 90, NOW(), NOW()),
  
  -- Reservas para el FIN DE SEMANA (próximo sábado y domingo)
  (6, 1, CURRENT_DATE + (6 - EXTRACT(DOW FROM CURRENT_DATE)::int) % 7, '13:30:00', 'Cumpleaños', 'confirmed', 90, NOW(), NOW()),
  (7, 2, CURRENT_DATE + (6 - EXTRACT(DOW FROM CURRENT_DATE)::int) % 7, '20:00:00', NULL, 'confirmed', 90, NOW(), NOW()),
  (8, 3, CURRENT_DATE + (7 - EXTRACT(DOW FROM CURRENT_DATE)::int) % 7, '14:00:00', 'Mesa con vistas', 'confirmed', 90, NOW(), NOW()),
  (9, 4, CURRENT_DATE + (7 - EXTRACT(DOW FROM CURRENT_DATE)::int) % 7, '21:00:00', 'Vino de reserva', 'confirmed', 120, NOW(), NOW());

-- =====================================================
-- VERIFICACIÓN DE DATOS
-- =====================================================
-- SELECT * FROM tables;
-- SELECT * FROM customers;
-- SELECT * FROM reservations ORDER BY reservation_date, reservation_time;