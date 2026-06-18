package backend.service;

import backend.model.PadreEstudiante;
import backend.repository.PadreEstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PadreEstudianteService {

    @Autowired
    private PadreEstudianteRepository repository;

    public List<PadreEstudiante> listar() {
        return repository.findAll();
    }

    public PadreEstudiante guardar(PadreEstudiante relacion) {
        return repository.save(relacion);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }

    public PadreEstudiante obtenerPorId(Integer id) {
        return repository.findById(id).orElse(null);
    }
}