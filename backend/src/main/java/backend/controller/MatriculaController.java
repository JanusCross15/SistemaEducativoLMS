package backend.controller;

import backend.model.Matricula;
import backend.repository.MatriculaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matriculas")
@CrossOrigin(origins = "http://localhost:5173")
public class MatriculaController {

    @Autowired
    private MatriculaRepository matriculaRepository;

    // LISTAR
    @GetMapping
    public List<Matricula> listarMatriculas() {
        return matriculaRepository.findAll();
    }

    // GUARDAR
    @PostMapping
    public Matricula guardarMatricula(@RequestBody Matricula matricula) {
        return matriculaRepository.save(matricula);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Matricula obtenerMatricula(@PathVariable Long id) {
        return matriculaRepository.findById(id).orElse(null);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Matricula actualizarMatricula(@PathVariable Long id,
                                         @RequestBody Matricula datos) {

        Matricula matricula = matriculaRepository.findById(id).orElse(null);

        if (matricula != null) {

            matricula.setFechaMatricula(datos.getFechaMatricula());
            matricula.setEstado(datos.getEstado());

            return matriculaRepository.save(matricula);
        }

        return null;
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public String eliminarMatricula(@PathVariable Long id) {

        matriculaRepository.deleteById(id);

        return "Matrícula eliminada correctamente";
    }
}