package backend.controller;

import backend.dto.AlumnoCursoDTO;
import backend.service.AlumnoCursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alumnos-curso")
@CrossOrigin(origins = "*")
public class AlumnoCursoController {

    @Autowired
    private AlumnoCursoService service;

    @GetMapping
    public ResponseEntity<?> listarAlumnos(
            @RequestParam String idCurso,
            @RequestParam String idDocente) {
        try {
            List<AlumnoCursoDTO> lista = service.listarAlumnos(idCurso, idDocente);

            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("success", true);
            respuesta.put("data", lista);
            respuesta.put("total", lista.size());

            return ResponseEntity.ok(respuesta);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("mensaje", "Error: " + e.getMessage());

            return ResponseEntity.badRequest().body(error);
        }
    }
}
