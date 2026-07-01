package backend.service;

import backend.dto.AlumnoCursoDTO;
import backend.repository.AlumnoCursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumnoCursoService {

    @Autowired
    private AlumnoCursoRepository repository;

    public List<AlumnoCursoDTO> listarAlumnos(String idCurso, String idDocente) {
        return repository.listarAlumnosCurso(idCurso, idDocente);
    }
}
