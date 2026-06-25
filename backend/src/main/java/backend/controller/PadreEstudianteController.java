package backend.controller;

import backend.model.PadreEstudiante;
import backend.repository.PadreEstudianteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/padre-estudiante")
@CrossOrigin(origins = "*")
public class PadreEstudianteController {

    @Autowired
    private PadreEstudianteRepository repository;

    @GetMapping
    public List<PadreEstudiante> listar() {
        return repository.findAll();
    }

    @PostMapping
    public PadreEstudiante guardar(
            @RequestBody PadreEstudiante padreEstudiante) {

        boolean existe = repository.existsByPadre_IdPadreAndEstudiante_IdEstudiante(
                padreEstudiante.getPadre().getIdPadre(),
                padreEstudiante.getEstudiante().getIdEstudiante());

        if (existe) {
            throw new RuntimeException(
                    "Este vínculo ya existe");
        }

        return repository.save(padreEstudiante);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}