package backend.repository;

import backend.model.Padre;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PadreRepository
        extends JpaRepository<Padre, Integer> {

    List<Padre> findByEstudiante_IdEstudiante(
            Integer idEstudiante
    );
}