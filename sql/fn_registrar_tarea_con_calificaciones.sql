-- =============================================
-- FUNCIÓN: Registrar tarea/examen con calificaciones automáticas
-- Tablas involucradas:
--   1. tareas
--   2. cursos
--   3. estudiantes
--   4. calificaciones
--   5. matriculas
-- =============================================

CREATE OR REPLACE FUNCTION fn_registrar_tarea_con_calificaciones(
    p_id_curso VARCHAR,
    p_titulo VARCHAR,
    p_descripcion VARCHAR,
    p_fecha_entrega VARCHAR,
    p_puntaje_maximo VARCHAR,
    p_estado VARCHAR,
    p_grado VARCHAR,
    p_seccion VARCHAR
)
RETURNS TABLE(
    out_id_tarea INT,
    out_id_curso INT,
    out_curso_nombre VARCHAR,
    out_total_estudiantes BIGINT,
    out_total_calificaciones BIGINT,
    out_mensaje VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_tarea INT;
    v_id_curso INT;
    v_curso_nombre VARCHAR;
    v_total_estudiantes BIGINT;
    v_total_calificaciones BIGINT;
    v_fecha DATE;
    v_puntaje DECIMAL;
    v_estado VARCHAR;
    v_contador INT;
BEGIN
    v_id_curso := p_id_curso::INTEGER;
    v_fecha := p_fecha_entrega::DATE;
    v_puntaje := p_puntaje_maximo::DECIMAL;
    v_estado := COALESCE(p_estado, 'Tarea');

    -- Obtener nombre del curso
    SELECT nombre INTO v_curso_nombre FROM cursos WHERE id_curso = v_id_curso;

    IF v_curso_nombre IS NULL THEN
        RAISE EXCEPTION 'El curso con ID % no existe', v_id_curso;
    END IF;

    -- Insertar la tarea
    INSERT INTO tareas (id_curso, titulo, descripcion, fecha_entrega, puntaje_maximo, estado)
    VALUES (v_id_curso, p_titulo, p_descripcion, v_fecha, v_puntaje, v_estado)
    RETURNING id_tarea INTO v_id_tarea;

    -- Contar estudiantes del grado/seccion
    SELECT COUNT(*) INTO v_total_estudiantes
    FROM estudiantes e
    INNER JOIN matriculas m ON e.id_matricula = m.id_matricula
    WHERE m.grado = p_grado AND m.seccion = p_seccion;

    -- Insertar calificaciones con nota 0 para cada estudiante del grado/seccion
    INSERT INTO calificaciones (id_estudiante, id_tarea, nota, observacion, fecha_registro)
    SELECT
        e.id_estudiante,
        v_id_tarea,
        0,
        'Pendiente de calificar',
        CURRENT_DATE
    FROM estudiantes e
    INNER JOIN matriculas m ON e.id_matricula = m.id_matricula
    WHERE m.grado = p_grado AND m.seccion = p_seccion;

    -- Contar calificaciones insertadas
    v_total_calificaciones := v_total_estudiantes;

    RETURN QUERY SELECT
        v_id_tarea,
        v_id_curso,
        v_curso_nombre::VARCHAR,
        v_total_estudiantes,
        v_total_calificaciones,
        ('Tarea "' || p_titulo || '" registrada con ' || v_total_calificaciones || ' calificaciones pendientes')::VARCHAR;
END;
$$;
