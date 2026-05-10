package backend.controller;

import backend.model.Tarea;
import backend.repository.TareaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "http://localhost:5173")
public class TareaController {

    @Autowired
    private TareaRepository tareaRepository;

    // LISTAR
    @GetMapping
    public List<Tarea> listarTareas() {
        return tareaRepository.findAll();
    }

    // GUARDAR
    @PostMapping
    public Tarea guardarTarea(@RequestBody Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Tarea obtenerTarea(@PathVariable Long id) {
        return tareaRepository.findById(id).orElse(null);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Tarea actualizarTarea(@PathVariable Long id,
                                 @RequestBody Tarea datos) {

        Tarea tarea = tareaRepository.findById(id).orElse(null);

        if (tarea != null) {

            tarea.setTitulo(datos.getTitulo());
            tarea.setDescripcion(datos.getDescripcion());
            tarea.setFechaEntrega(datos.getFechaEntrega());

            return tareaRepository.save(tarea);
        }

        return null;
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public String eliminarTarea(@PathVariable Long id) {

        tareaRepository.deleteById(id);

        return "Tarea eliminada correctamente";
    }
}