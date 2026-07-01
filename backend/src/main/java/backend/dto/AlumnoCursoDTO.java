package backend.dto;

import java.math.BigDecimal;

public class AlumnoCursoDTO {

    private String codigo;
    private String nombreCompleto;
    private String grado;
    private String seccion;
    private BigDecimal promedio;
    private String estado;
    private String observaciones;
    private Long totalTareas;

    public AlumnoCursoDTO() {}

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getGrado() {
        return grado;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }

    public String getSeccion() {
        return seccion;
    }

    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }

    public BigDecimal getPromedio() {
        return promedio;
    }

    public void setPromedio(BigDecimal promedio) {
        this.promedio = promedio;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Long getTotalTareas() {
        return totalTareas;
    }

    public void setTotalTareas(Long totalTareas) {
        this.totalTareas = totalTareas;
    }
}
