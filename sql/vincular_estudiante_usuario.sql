-- =============================================
-- VINCULAR ESTUDIANTE CON USUARIO
-- Sistema Educativo LMS
-- Ejecutar en pgAdmin sobre la BD LMS_matricula
-- =============================================

-- Paso 1: Verificar el usuario ESTUDIANTE
SELECT id_usuario, nombre, correo, rol 
FROM usuarios 
WHERE correo = 'lucia.torres@colegio.edu.pe';

-- Paso 2: Buscar el estudiante "Lucía Torres"
SELECT id_estudiante, codigo_estudiante, nombres, apellido_paterno, apellido_materno, id_usuario
FROM estudiantes 
WHERE LOWER(nombres) LIKE '%lucia%' 
  AND LOWER(apellido_paterno) LIKE '%torres%';

-- Paso 3: VINCULAR (ejecutar esto DESPUÉS de verificar los IDs en los pasos 1 y 2)
-- Reemplaza :id_usuario y :id_estudiante con los valores reales que te den los pasos anteriores
-- Ejemplo: si id_usuario = 15 y id_estudiante = 5, sería:
--   UPDATE estudiantes SET id_usuario = 15 WHERE id_estudiante = 5;

UPDATE estudiantes 
SET id_usuario = (
    SELECT id_usuario FROM usuarios WHERE correo = 'lucia.torres@colegio.edu.pe'
)
WHERE id_estudiante = (
    SELECT id_estudiante FROM estudiantes 
    WHERE LOWER(nombres) LIKE '%lucia%' 
      AND LOWER(apellido_paterno) LIKE '%torres%'
    LIMIT 1
);

-- Paso 4: Verificar que quedó bien
SELECT e.id_estudiante, e.codigo_estudiante, e.nombres, e.apellido_paterno, 
       e.id_usuario, u.nombre AS usuario_nombre, u.correo, u.rol
FROM estudiantes e
JOIN usuarios u ON e.id_usuario = u.id_usuario
WHERE u.correo = 'lucia.torres@colegio.edu.pe';
