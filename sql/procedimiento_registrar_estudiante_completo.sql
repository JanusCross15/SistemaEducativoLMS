-- =============================================
-- ELIMINAR FUNCIÓN ANTERIOR SI EXISTE
-- =============================================
DROP FUNCTION IF EXISTS fn_registrar_estudiante_completo(
    VARCHAR, VARCHAR, VARCHAR,
    VARCHAR, VARCHAR, VARCHAR,
    DATE,
    VARCHAR, VARCHAR, VARCHAR,
    VARCHAR, VARCHAR, VARCHAR,
    VARCHAR, VARCHAR, VARCHAR,
    VARCHAR, VARCHAR, VARCHAR
);

-- =============================================
-- PROCEDIMIENTO: Registrar Estudiante Completo
-- Tablas involucradas:
--   1. matriculas
--   2. estudiantes
--   3. padres
--   4. padre_estudiante
--   5. solicitudes_matricula
-- =============================================

CREATE OR REPLACE FUNCTION fn_registrar_estudiante_completo(
    p_nivel VARCHAR,
    p_grado VARCHAR,
    p_seccion VARCHAR,
    p_apellido_paterno VARCHAR,
    p_apellido_materno VARCHAR,
    p_nombres VARCHAR,
    p_fecha_nacimiento VARCHAR,
    p_provincia VARCHAR,
    p_departamento VARCHAR,
    p_distrito VARCHAR,
    p_sexo VARCHAR,
    p_dni VARCHAR,
    p_direccion VARCHAR,
    p_padre_nombres VARCHAR,
    p_padre_apellidos VARCHAR,
    p_padre_dni VARCHAR,
    p_padre_telefono VARCHAR,
    p_padre_direccion VARCHAR,
    p_padre_tipo VARCHAR
)
RETURNS TABLE(
    out_id_matricula INT,
    out_id_estudiante INT,
    out_id_padre INT,
    out_id_solicitud INT,
    out_codigo_estudiante VARCHAR,
    out_mensaje VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_matricula INT;
    v_id_estudiante INT;
    v_id_padre INT;
    v_id_solicitud INT;
    v_codigo_estudiante VARCHAR;
    v_edad INT;
    v_contador INT;
    v_fecha DATE;
BEGIN
    -- Castear fecha
    v_fecha := p_fecha_nacimiento::DATE;

    -- Calcular edad
    v_edad := EXTRACT(YEAR FROM age(CURRENT_DATE, v_fecha));

    -- Insertar matrícula
    INSERT INTO matriculas (nivel, grado, seccion, dni, celular, fecha_matricula)
    VALUES (p_nivel, p_grado, p_seccion, p_dni, p_padre_telefono, CURRENT_DATE)
    RETURNING id_matricula INTO v_id_matricula;

    -- Generar código
    SELECT COUNT(*) + 1 INTO v_contador FROM estudiantes;
    v_codigo_estudiante := 'EST-' || LPAD(v_contador::TEXT, 4, '0');

    -- Insertar estudiante
    INSERT INTO estudiantes (
        codigo_estudiante, apellido_paterno, apellido_materno,
        nombres, fecha_nacimiento, provincia, departamento,
        distrito, sexo, dni, edad, direccion, id_matricula
    )
    VALUES (
        v_codigo_estudiante, p_apellido_paterno, p_apellido_materno,
        p_nombres, v_fecha, p_provincia, p_departamento,
        p_distrito, p_sexo, p_dni, v_edad, p_direccion, v_id_matricula
    )
    RETURNING id_estudiante INTO v_id_estudiante;

    -- Insertar padre si no existe
    SELECT id_padre INTO v_id_padre
    FROM padres WHERE dni = p_padre_dni;

    IF v_id_padre IS NULL THEN
        INSERT INTO padres (nombres, apellidos, dni, telefono, direccion, tipo)
        VALUES (p_padre_nombres, p_padre_apellidos, p_padre_dni, p_padre_telefono, p_padre_direccion, p_padre_tipo)
        RETURNING id_padre INTO v_id_padre;
    END IF;

    -- Vincular padre-estudiante
    INSERT INTO padre_estudiante (id_padre, id_estudiante)
    VALUES (v_id_padre, v_id_estudiante);

    -- Crear solicitud
    INSERT INTO solicitudes_matricula (fecha_solicitud, estado, observacion, id_padre, id_estudiante)
    VALUES (CURRENT_DATE, 'PENDIENTE', 'Solicitud registrada desde sistema', v_id_padre, v_id_estudiante)
    RETURNING id_solicitud INTO v_id_solicitud;

    -- Retornar
    RETURN QUERY SELECT
        v_id_matricula,
        v_id_estudiante,
        v_id_padre,
        v_id_solicitud,
        v_codigo_estudiante,
        'Estudiante registrado exitosamente'::VARCHAR;

END;
$$;
