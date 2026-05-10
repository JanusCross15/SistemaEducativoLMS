package backend.controller;

import backend.model.Docente;
import backend.repository.DocenteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/docentes")
@CrossOrigin(origins = "http://localhost:5173")
public class DocenteController {

    @Autowired
    private DocenteRepository docenteRepository;

    // LISTAR
    @GetMapping
    public List<Docente> listarDocentes() {
        return docenteRepository.findAll();
    }

    // GUARDAR
    @PostMapping
    public Docente guardarDocente(@RequestBody Docente docente) {
        return docenteRepository.save(docente);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Docente obtenerDocente(@PathVariable Long id) {
        return docenteRepository.findById(id).orElse(null);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Docente actualizarDocente(
            @PathVariable Long id,
            @RequestBody Docente datos) {

        Docente docente = docenteRepository.findById(id).orElse(null);

        if (docente != null) {

            docente.setNombres(datos.getNombres());
            docente.setApellidos(datos.getApellidos());
            docente.setDni(datos.getDni());
            docente.setCorreo(datos.getCorreo());
            docente.setEspecialidad(datos.getEspecialidad());
            docente.setTelefono(datos.getTelefono());

            return docenteRepository.save(docente);
        }

        return null;
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public String eliminarDocente(@PathVariable Long id) {

        docenteRepository.deleteById(id);

        return "Docente eliminado correctamente";
    }
}