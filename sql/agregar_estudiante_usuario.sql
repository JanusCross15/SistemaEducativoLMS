-- =============================================
-- AGREGAR USUARIOS ESTUDIANTE Y VINCULAR
-- Sistema Educativo LMS
-- =============================================

-- 1. AGREGAR COLUMNA id_usuario A TABLA estudiantes
ALTER TABLE estudiantes ADD COLUMN id_usuario INTEGER;

-- 2. AGREGAR FK A TABLA usuarios
ALTER TABLE estudiantes ADD CONSTRAINT fk_estudiante_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);

-- 3. CREAR USUARIOS CON ROL ESTUDIANTE
INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Deyvi Clemente', 'deyvi@sagradafamilia.edu.pe', 'estudiante123', 'ESTUDIANTE', 'ACTIVO');

INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Adrian Salcedo', 'adrian@sagradafamilia.edu.pe', 'estudiante123', 'ESTUDIANTE', 'ACTIVO');

INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Maria Mendoza', 'maria.mendoza@sagradafamilia.edu.pe', 'estudiante123', 'ESTUDIANTE', 'ACTIVO');

INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Juan Quispe', 'juan.quispe@sagradafamilia.edu.pe', 'estudiante123', 'ESTUDIANTE', 'ACTIVO');

-- 4. VINCULAR ESTUDIANTES CON SUS USUARIOS
-- (Ajustar los IDs segun los IDs generados en tu base de datos)
-- Los IDs de usuarios ESTUDIANTE seran: 9, 10, 11, 12 (despues de los 8 existentes)

UPDATE estudiantes SET id_usuario = 9 WHERE codigo_estudiante = 'EST001';
UPDATE estudiantes SET id_usuario = 10 WHERE codigo_estudiante = 'EST002';
UPDATE estudiantes SET id_usuario = 11 WHERE codigo_estudiante = 'EST003';
UPDATE estudiantes SET id_usuario = 12 WHERE codigo_estudiante = 'EST004';
