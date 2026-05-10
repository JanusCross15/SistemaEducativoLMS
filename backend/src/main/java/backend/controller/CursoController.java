package backend.controller;

import backend.model.Curso;
import backend.repository.CursoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "http://localhost:5173")
public class CursoController {

    @Autowired
    private CursoRepository cursoRepository;

    // LISTAR
    @GetMapping
    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    // GUARDAR
    @PostMapping
    public Curso guardarCurso(@RequestBody Curso curso) {
        return cursoRepository.save(curso);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Curso obtenerCurso(@PathVariable Long id) {
        return cursoRepository.findById(id).orElse(null);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Curso actualizarCurso(@PathVariable Long id,
                                 @RequestBody Curso datos) {

        Curso curso = cursoRepository.findById(id).orElse(null);

        if (curso != null) {

            curso.setNombre(datos.getNombre());
            curso.setDescripcion(datos.getDescripcion());
            curso.setEstado(datos.getEstado());

            return cursoRepository.save(curso);
        }

        return null;
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public String eliminarCurso(@PathVariable Long id) {

        cursoRepository.deleteById(id);

        return "Curso eliminado correctamente";
    }
}