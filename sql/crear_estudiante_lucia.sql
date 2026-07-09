-- =============================================
-- CREAR ESTUDIANTE Y VINCULAR CON USUARIO
-- Lucía Torres - lucia.torres@colegio.edu.pe
-- =============================================

-- Paso 1: Crear matrícula
INSERT INTO matriculas (nivel, grado, seccion, dni, celular, fecha_matricula)
VALUES ('Primaria', '2DO', 'A', '68645121', '', CURRENT_DATE)
RETURNING id_matricula;

-- Anota el id_matricula que te devuelva el Paso 1
-- y reemplázalo en el WHERE del Paso 2 y 3

-- Paso 2: Crear estudiante vinculado al usuario
INSERT INTO estudiantes (codigo_estudiante, apellido_paterno, apellido_materno, nombres, 
                         fecha_nacimiento, sexo, edad, dni, direccion, 
                         id_matricula, id_usuario)
VALUES (
    'EST-' || LPAD((SELECT COUNT(*) + 1 FROM estudiantes)::TEXT, 4, '0'),
    'Torres', 
    '', 
    'Lucía',
    '2011-06-12',
    'FEMENINO',
    15,
    '68645121',
    'Av. Torres 123',
    (SELECT id_matricula FROM matriculas ORDER BY id_matricula DESC LIMIT 1),
    (SELECT id_usuario FROM usuarios WHERE correo = 'lucia.torres@colegio.edu.pe')
)
RETURNING id_estudiante, codigo_estudiante;

-- Paso 3: Verificar que todo quedó bien
SELECT e.id_estudiante, e.codigo_estudiante, e.nombres, e.apellido_paterno, 
       e.dni, e.sexo, e.edad, e.direccion, e.id_usuario,
       m.nivel, m.grado, m.seccion,
       u.nombre AS usuario_nombre, u.correo, u.rol
FROM estudiantes e
JOIN matriculas m ON e.id_matricula = m.id_matricula
JOIN usuarios u ON e.id_usuario = u.id_usuario
WHERE u.correo = 'lucia.torres@colegio.edu.pe';
