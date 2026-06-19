package backend.controller;

import backend.model.Padre;
import backend.model.Estudiante;
import backend.model.PadreEstudiante;

import backend.repository.PadreRepository;
import backend.repository.PadreEstudianteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/padres")
@CrossOrigin("*")
public class PadreController {

    @Autowired
    private PadreRepository padreRepository;

    @Autowired
    private PadreEstudianteRepository padreEstudianteRepository;

    // LISTAR

    @GetMapping
    public List<Padre> listarPadres() {

        return padreRepository.findAll();
    }

    // OBTENER HIJOS DEL PADRE SEGÚN EL USUARIO LOGUEADO

    @GetMapping("/usuario/{idUsuario}/hijos")
    public List<Estudiante> obtenerHijos(
            @PathVariable Integer idUsuario) {

        Padre padre =
                padreRepository.findByUsuario_IdUsuario(
                        idUsuario);

        if (padre == null) {
            return List.of();
        }

        return padreEstudianteRepository
                .findByPadre_IdPadre(
                        padre.getIdPadre())
                .stream()
                .map(PadreEstudiante::getEstudiante)
                .toList();
    }

    // GUARDAR

    @PostMapping
    public Padre guardarPadre(
            @RequestBody Padre padre) {

        return padreRepository.save(padre);
    }

    // ACTUALIZAR

    @PutMapping("/{id}")
    public Padre actualizarPadre(
            @PathVariable Integer id,
            @RequestBody Padre padreActualizado) {

        Padre padre =
                padreRepository
                        .findById(id)
                        .orElse(null);

        if (padre == null) {
            return null;
        }

        padre.setNombres(
                padreActualizado.getNombres());

        padre.setApellidos(
                padreActualizado.getApellidos());

        padre.setDni(
                padreActualizado.getDni());

        padre.setTelefono(
                padreActualizado.getTelefono());

        padre.setDireccion(
                padreActualizado.getDireccion());

        padre.setTipo(
                padreActualizado.getTipo());

        return padreRepository.save(padre);
    }

    // ELIMINAR

    @DeleteMapping("/{id}")
    public void eliminarPadre(
            @PathVariable Integer id) {

        padreRepository.deleteById(id);
    }
}