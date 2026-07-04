package backend.dto;

public class ResultadoRegistroDTO {

    private Integer idMatricula;
    private Integer idEstudiante;
    private Integer idPadre;
    private Integer idSolicitud;
    private String codigoEstudiante;
    private String mensaje;

    public ResultadoRegistroDTO() {}

    public ResultadoRegistroDTO(Integer idMatricula, Integer idEstudiante, Integer idPadre,
                                 Integer idSolicitud, String codigoEstudiante, String mensaje) {
        this.idMatricula = idMatricula;
        this.idEstudiante = idEstudiante;
        this.idPadre = idPadre;
        this.idSolicitud = idSolicitud;
        this.codigoEstudiante = codigoEstudiante;
        this.mensaje = mensaje;
    }

    public Integer getIdMatricula() {
        return idMatricula;
    }

    public void setIdMatricula(Integer idMatricula) {
        this.idMatricula = idMatricula;
    }

    public Integer getIdEstudiante() {
        return idEstudiante;
    }

    public void setIdEstudiante(Integer idEstudiante) {
        this.idEstudiante = idEstudiante;
    }

    public Integer getIdPadre() {
        return idPadre;
    }

    public void setIdPadre(Integer idPadre) {
        this.idPadre = idPadre;
    }

    public Integer getIdSolicitud() {
        return idSolicitud;
    }

    public void setIdSolicitud(Integer idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    public String getCodigoEstudiante() {
        return codigoEstudiante;
    }

    public void setCodigoEstudiante(String codigoEstudiante) {
        this.codigoEstudiante = codigoEstudiante;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
