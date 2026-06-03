package backend.repository;

import backend.model.PadreEstudiante;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PadreEstudianteRepository
        extends JpaRepository<PadreEstudiante, Integer> {

    List<PadreEstudiante>
    findByEstudiante_IdEstudiante(Integer idEstudiante);

}