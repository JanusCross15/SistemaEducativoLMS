package backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CalificacionEstudianteDTO {

    private Integer idCalificacion;
    private String tituloTarea;
    private String nombreCurso;
    private BigDecimal nota;
    private BigDecimal puntajeMaximo;
    private String observacion;
    private LocalDate fechaEntrega;
    private LocalDate fechaRegistro;
    private String estadoTarea;

    public CalificacionEstudianteDTO() {}

    public CalificacionEstudianteDTO(Integer idCalificacion, String tituloTarea, String nombreCurso,
                                     BigDecimal nota, BigDecimal puntajeMaximo, String observacion,
                                     LocalDate fechaEntrega, LocalDate fechaRegistro, String estadoTarea) {
        this.idCalificacion = idCalificacion;
        this.tituloTarea = tituloTarea;
        this.nombreCurso = nombreCurso;
        this.nota = nota;
        this.puntajeMaximo = puntajeMaximo;
        this.observacion = observacion;
        this.fechaEntrega = fechaEntrega;
        this.fechaRegistro = fechaRegistro;
        this.estadoTarea = estadoTarea;
    }

    public Integer getIdCalificacion() {
        return idCalificacion;
    }

    public void setIdCalificacion(Integer idCalificacion) {
        this.idCalificacion = idCalificacion;
    }

    public String getTituloTarea() {
        return tituloTarea;
    }

    public void setTituloTarea(String tituloTarea) {
        this.tituloTarea = tituloTarea;
    }

    public String getNombreCurso() {
        return nombreCurso;
    }

    public void setNombreCurso(String nombreCurso) {
        this.nombreCurso = nombreCurso;
    }

    public BigDecimal getNota() {
        return nota;
    }

    public void setNota(BigDecimal nota) {
        this.nota = nota;
    }

    public BigDecimal getPuntajeMaximo() {
        return puntajeMaximo;
    }

    public void setPuntajeMaximo(BigDecimal puntajeMaximo) {
        this.puntajeMaximo = puntajeMaximo;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public String getEstadoTarea() {
        return estadoTarea;
    }

    public void setEstadoTarea(String estadoTarea) {
        this.estadoTarea = estadoTarea;
    }
}
