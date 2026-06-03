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
            @RequestBody Padre padreActualizado
    ) {

        Padre padre =
                padreRepository
                        .findById(id)
                        .orElse(null);

        if (padre == null) {
            return null;
        }

        padre.setNombres(
                padreActualizado.getNombres()
        );

        padre.setApellidos(
                padreActualizado.getApellidos()
        );

        padre.setDni(
                padreActualizado.getDni()
        );

        padre.setTelefono(
                padreActualizado.getTelefono()
        );

        padre.setDireccion(
                padreActualizado.getDireccion()
        );

        padre.setTipo(
                padreActualizado.getTipo()
        );

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