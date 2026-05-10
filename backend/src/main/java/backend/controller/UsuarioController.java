package backend.controller;

import backend.model.Usuario;
import backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // LISTAR
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // GUARDAR
    @PostMapping
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Usuario obtenerUsuario(@PathVariable Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable Long id,
                                     @RequestBody Usuario datos) {

        Usuario usuario = usuarioRepository.findById(id).orElse(null);

        if (usuario != null) {

            usuario.setNombre(datos.getNombre());
            usuario.setCorreo(datos.getCorreo());
            usuario.setPassword(datos.getPassword());
            usuario.setRol(datos.getRol());
            usuario.setEstado(datos.getEstado());

            return usuarioRepository.save(usuario);
        }

        return null;
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public String eliminarUsuario(@PathVariable Long id) {

        usuarioRepository.deleteById(id);

        return "Usuario eliminado correctamente";
    }
}