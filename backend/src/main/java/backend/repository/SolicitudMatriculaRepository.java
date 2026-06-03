package backend.repository;

import backend.model.SolicitudMatricula;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitudMatriculaRepository
        extends JpaRepository<SolicitudMatricula, Integer> {
}