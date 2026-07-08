package backend.dto;

public class TareaCalificacionDTO {

    private String idCurso;
    private String titulo;
    private String descripcion;
    private String fechaEntrega;
    private String puntajeMaximo;
    private String estado;
    private String grado;
    private String seccion;

    public TareaCalificacionDTO() {}

    public String getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(String idCurso) {
        this.idCurso = idCurso;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public String getPuntajeMaximo() {
        return puntajeMaximo;
    }

    public void setPuntajeMaximo(String puntajeMaximo) {
        this.puntajeMaximo = puntajeMaximo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
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
}
