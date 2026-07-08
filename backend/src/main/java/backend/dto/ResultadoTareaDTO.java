package backend.dto;

import java.math.BigDecimal;

public class ResultadoTareaDTO {

    private Integer idTarea;
    private Integer idCurso;
    private String cursoNombre;
    private Long totalEstudiantes;
    private Long totalCalificaciones;
    private String mensaje;

    public ResultadoTareaDTO() {}

    public ResultadoTareaDTO(Integer idTarea, Integer idCurso, String cursoNombre,
                              Long totalEstudiantes, Long totalCalificaciones, String mensaje) {
        this.idTarea = idTarea;
        this.idCurso = idCurso;
        this.cursoNombre = cursoNombre;
        this.totalEstudiantes = totalEstudiantes;
        this.totalCalificaciones = totalCalificaciones;
        this.mensaje = mensaje;
    }

    public Integer getIdTarea() {
        return idTarea;
    }

    public void setIdTarea(Integer idTarea) {
        this.idTarea = idTarea;
    }

    public Integer getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(Integer idCurso) {
        this.idCurso = idCurso;
    }

    public String getCursoNombre() {
        return cursoNombre;
    }

    public void setCursoNombre(String cursoNombre) {
        this.cursoNombre = cursoNombre;
    }

    public Long getTotalEstudiantes() {
        return totalEstudiantes;
    }

    public void setTotalEstudiantes(Long totalEstudiantes) {
        this.totalEstudiantes = totalEstudiantes;
    }

    public Long getTotalCalificaciones() {
        return totalCalificaciones;
    }

    public void setTotalCalificaciones(Long totalCalificaciones) {
        this.totalCalificaciones = totalCalificaciones;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
