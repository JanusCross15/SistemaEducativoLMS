package backend.repository;

import backend.dto.TareaCalificacionDTO;
import backend.dto.ResultadoTareaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;

@Repository
public class TareaCalificacionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ResultadoTareaDTO registrarTareaConCalificaciones(TareaCalificacionDTO dto) {

        String sql = "{call fn_registrar_tarea_con_calificaciones(?,?,?,?,?,?,?,?)}";

        return jdbcTemplate.execute((Connection conn) -> {
            CallableStatement cs = conn.prepareCall(sql);

            cs.setString(1, dto.getIdCurso());
            cs.setString(2, dto.getTitulo());
            cs.setString(3, dto.getDescripcion());
            cs.setString(4, dto.getFechaEntrega());
            cs.setString(5, dto.getPuntajeMaximo());
            cs.setString(6, dto.getEstado() != null ? dto.getEstado() : "Tarea");
            cs.setString(7, dto.getGrado());
            cs.setString(8, dto.getSeccion());

            ResultSet rs = cs.executeQuery();

            if (rs.next()) {
                return new ResultadoTareaDTO(
                        rs.getInt(1),
                        rs.getInt(2),
                        rs.getString(3),
                        rs.getLong(4),
                        rs.getLong(5),
                        rs.getString(6)
                );
            }
            throw new RuntimeException("No se obtuvo resultado del procedimiento");
        });
    }
}
