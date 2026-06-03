package backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "padre_estudiante")
public class PadreEstudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_padre_estudiante")
    private Integer idPadreEstudiante;

    @ManyToOne
    @JoinColumn(name = "id_padre")
    private Padre padre;

    @ManyToOne
    @JoinColumn(name = "id_estudiante")
    private Estudiante estudiante;

    public Integer getIdPadreEstudiante() {
        return idPadreEstudiante;
    }

    public void setIdPadreEstudiante(Integer idPadreEstudiante) {
        this.idPadreEstudiante = idPadreEstudiante;
    }

    public Padre getPadre() {
        return padre;
    }

    public void setPadre(Padre padre) {
        this.padre = padre;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }
}