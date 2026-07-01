package backend.dto;

import java.time.LocalDate;

public class RegistroEstudianteDTO {

    // Datos de matrícula
    private String nivel;
    private String grado;
    private String seccion;

    // Datos del estudiante
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String nombres;
    private LocalDate fechaNacimiento;
    private String provincia;
    private String departamento;
    private String distrito;
    private String sexo;
    private String dni;
    private String direccion;

    // Datos del padre/apoderado
    private String padreNombres;
    private String padreApellidos;
    private String padreDni;
    private String padreTelefono;
    private String padreDireccion;
    private String padreTipo;

    public RegistroEstudianteDTO() {}

    // Getters y Setters

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
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

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getPadreNombres() {
        return padreNombres;
    }

    public void setPadreNombres(String padreNombres) {
        this.padreNombres = padreNombres;
    }

    public String getPadreApellidos() {
        return padreApellidos;
    }

    public void setPadreApellidos(String padreApellidos) {
        this.padreApellidos = padreApellidos;
    }

    public String getPadreDni() {
        return padreDni;
    }

    public void setPadreDni(String padreDni) {
        this.padreDni = padreDni;
    }

    public String getPadreTelefono() {
        return padreTelefono;
    }

    public void setPadreTelefono(String padreTelefono) {
        this.padreTelefono = padreTelefono;
    }

    public String getPadreDireccion() {
        return padreDireccion;
    }

    public void setPadreDireccion(String padreDireccion) {
        this.padreDireccion = padreDireccion;
    }

    public String getPadreTipo() {
        return padreTipo;
    }

    public void setPadreTipo(String padreTipo) {
        this.padreTipo = padreTipo;
    }
}
