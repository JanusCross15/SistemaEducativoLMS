-- =============================================
-- FUNCIÓN: Listar alumnos aprobados y desaprobados
-- Tablas involucradas:
--   1. estudiantes
--   2. calificaciones
--   3. tareas
--   4. matriculas
--   5. cursos
-- =============================================

CREATE OR REPLACE FUNCTION fn_listar_alumnos_curso(
    p_id_curso VARCHAR,
    p_id_docente VARCHAR
)
RETURNS TABLE(
    out_codigo VARCHAR,
    out_nombre_completo VARCHAR,
    out_grado VARCHAR,
    out_seccion VARCHAR,
    out_promedio DECIMAL,
    out_estado VARCHAR,
    out_observaciones TEXT,
    out_total_tareas BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.codigo_estudiante::VARCHAR,
        (e.apellido_paterno || ', ' || e.apellido_materno || ' ' || e.nombres)::VARCHAR,
        m.grado::VARCHAR,
        m.seccion::VARCHAR,
        ROUND(AVG(c.nota), 2),
        CASE
            WHEN AVG(c.nota) >= 11 THEN 'APROBADO'
            ELSE 'DESAPROBADO'
        END::VARCHAR,
        STRING_AGG(DISTINCT c.observacion, ' | ')::TEXT,
        COUNT(c.id_calificacion)
    FROM calificaciones c
    INNER JOIN tareas t ON c.id_tarea = t.id_tarea
    INNER JOIN estudiantes e ON c.id_estudiante = e.id_estudiante
    INNER JOIN matriculas m ON e.id_matricula = m.id_matricula
    WHERE t.id_curso = p_id_curso::INTEGER
    GROUP BY
        e.codigo_estudiante,
        e.apellido_paterno,
        e.apellido_materno,
        e.nombres,
        m.grado,
        m.seccion
    ORDER BY
        e.apellido_paterno ASC,
        e.apellido_materno ASC,
        e.nombres ASC;
END;
$$;
