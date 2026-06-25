package backend.repository;

import backend.model.Padre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PadreRepository
        extends JpaRepository<Padre, Integer> {

    Padre findByUsuario_IdUsuario(Integer idUsuario);

}