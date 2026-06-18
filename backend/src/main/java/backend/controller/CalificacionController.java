package backend.controller;

import backend.model.Calificacion;
import backend.repository.CalificacionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calificaciones")
@CrossOrigin(origins = "http://localhost:5173")
public class CalificacionController {

    @Autowired
    private CalificacionRepository calificacionRepository;  

    // LISTAR
    @GetMapping
    public List<Calificacion> listarCalificaciones() {
        return calificacionRepository.findAll();
    }

    // GUARDAR
    @PostMapping
    public Calificacion guardarCalificacion(@RequestBody Calificacion calificacion) {
        return calificacionRepository.save(calificacion);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Calificacion obtenerCalificacion(@PathVariable Long id) {
        return calificacionRepository.findById(id).orElse(null);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Calificacion actualizarCalificacion(@PathVariable Long id,
                                               @RequestBody Calificacion datos) {

        Calificacion calificacion = calificacionRepository.findById(id).orElse(null);

        if (calificacion != null) {

            calificacion.setNota(datos.getNota());
            calificacion.setObservacion(datos.getObservacion());

            return calificacionRepository.save(calificacion);
        }

        return null;
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public String eliminarCalificacion(@PathVariable Long id) {

        calificacionRepository.deleteById(id);

        return "Calificación eliminada correctamente";
    }
}