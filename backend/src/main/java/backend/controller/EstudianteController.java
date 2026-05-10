package backend.controller;

import backend.model.Estudiante;
import backend.repository.EstudianteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "http://localhost:5173")
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    // LISTAR
    @GetMapping
    public List<Estudiante> listarEstudiantes() {
        return estudianteRepository.findAll();
    }

    // GUARDAR
    @PostMapping
    public Estudiante guardarEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Estudiante obtenerEstudiante(@PathVariable Long id) {
        return estudianteRepository.findById(id).orElse(null);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Estudiante actualizarEstudiante(
            @PathVariable Long id,
            @RequestBody Estudiante datos) {

        Estudiante estudiante = estudianteRepository.findById(id).orElse(null);

        if (estudiante != null) {

            estudiante.setCodigoEstudiante(datos.getCodigoEstudiante());
            estudiante.setNombres(datos.getNombres());
            estudiante.setApellidos(datos.getApellidos());
            estudiante.setFechaNacimiento(datos.getFechaNacimiento());
            estudiante.setGrado(datos.getGrado());
            estudiante.setSeccion(datos.getSeccion());
            estudiante.setEstado(datos.getEstado());

            return estudianteRepository.save(estudiante);
        }

        return null;
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public String eliminarEstudiante(@PathVariable Long id) {

        estudianteRepository.deleteById(id);

        return "Estudiante eliminado correctamente";
    }
}