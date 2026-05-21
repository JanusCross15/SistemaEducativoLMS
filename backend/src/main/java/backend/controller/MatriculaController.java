package backend.controller;

import backend.model.Matricula;
import backend.repository.MatriculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matriculas")
@CrossOrigin("*")
public class MatriculaController {

    @Autowired
    private MatriculaRepository matriculaRepository;

    @GetMapping
    public List<Matricula> listarMatriculas() {
        return matriculaRepository.findAll();
    }

    @PostMapping
    public Matricula guardarMatricula(@RequestBody Matricula matricula) {
        return matriculaRepository.save(matricula);
    }

    @PutMapping("/{id}")
    public Matricula actualizarMatricula(@PathVariable Integer id,
                                         @RequestBody Matricula matriculaActualizada) {

        Matricula matricula = matriculaRepository.findById(id).orElse(null);

        if (matricula == null) {
            return null;
        }

        matricula.setNivel(matriculaActualizada.getNivel());
        matricula.setGrado(matriculaActualizada.getGrado());
        matricula.setSeccion(matriculaActualizada.getSeccion());
        matricula.setDni(matriculaActualizada.getDni());
        matricula.setCelular(matriculaActualizada.getCelular());

        return matriculaRepository.save(matricula);
    }

    @DeleteMapping("/{id}")
    public void eliminarMatricula(@PathVariable Integer id) {
        matriculaRepository.deleteById(id);
    }
}