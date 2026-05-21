package backend.controller;

import backend.model.Padre;
import backend.repository.PadreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/padres")
@CrossOrigin("*")

public class PadreController {

    @Autowired
    private PadreRepository padreRepository;

    // LISTAR

    @GetMapping
    public List<Padre> listarPadres() {
        return padreRepository.findAll();
    }

    // GUARDAR

    @PostMapping
    public Padre guardarPadre(
            @RequestBody Padre padre
    ) {
        return padreRepository.save(padre);
    }

    // ACTUALIZAR

    @PutMapping("/{id}")

    public Padre actualizarPadre(
            @PathVariable Integer id,
            @RequestBody Padre datos
    ) {

        Padre padre =
                padreRepository.findById(id).orElse(null);

        if (padre == null) {
            return null;
        }

        padre.setNombres(datos.getNombres());
        padre.setApellidos(datos.getApellidos());
        padre.setDni(datos.getDni());
        padre.setTelefono(datos.getTelefono());
        padre.setDireccion(datos.getDireccion());
        padre.setTipo(datos.getTipo());

        padre.setEstudiante(datos.getEstudiante());

        return padreRepository.save(padre);
    }

    // ELIMINAR

    @DeleteMapping("/{id}")

    public void eliminarPadre(
            @PathVariable Integer id
    ) {
        padreRepository.deleteById(id);
    }
}