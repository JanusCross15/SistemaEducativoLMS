package backend.repository;

import backend.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {

    @Query("SELECT m FROM Material m WHERE m.idCurso = :idCurso ORDER BY m.fechaPublicacion DESC")
    List<Material> findByCurso(@Param("idCurso") Integer idCurso);

}