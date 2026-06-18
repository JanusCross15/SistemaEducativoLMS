package backend.controller;

import backend.model.Usuario;
import backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // LISTAR

    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    // GUARDAR

    @PostMapping
    public Usuario guardar(
            @RequestBody Usuario usuario) {

        return usuarioRepository.save(usuario);
        
    }

    // OBTENER POR ID

    @GetMapping("/{id}")
    public Usuario obtener(
            @PathVariable Integer id) {

        return usuarioRepository
                .findById(Integer.valueOf(id))
                .orElse(null);
    }

    // ACTUALIZAR

    @PutMapping("/{id}")
    public Usuario actualizar(
            @PathVariable Integer id,
            @RequestBody Usuario datos) {

        Usuario usuario =
                usuarioRepository
                        .findById(Integer.valueOf(id))
                        .orElse(null);

        if (usuario == null) {
            return null;
        }

        usuario.setNombre(datos.getNombre());
        usuario.setCorreo(datos.getCorreo());
        usuario.setPassword(datos.getPassword());
        usuario.setRol(datos.getRol());
        usuario.setEstado(datos.getEstado());

        return usuarioRepository.save(usuario);
    }

    // ELIMINAR

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Integer id) {

        usuarioRepository.deleteById(
                Integer.valueOf(id));
    }
}