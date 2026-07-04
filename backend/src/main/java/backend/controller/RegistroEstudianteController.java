package backend.controller;

import backend.dto.RegistroEstudianteDTO;
import backend.dto.ResultadoRegistroDTO;
import backend.service.RegistroEstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/registro")
@CrossOrigin(origins = "*")
public class RegistroEstudianteController {

    @Autowired
    private RegistroEstudianteService registroService;

    @PostMapping
    public ResponseEntity<?> registrarEstudiante(@RequestBody RegistroEstudianteDTO dto) {
        try {
            System.out.println("DTO recibido: " + dto.getNombres() + " " + dto.getApellidoPaterno());
            ResultadoRegistroDTO resultado = registroService.registrarEstudiante(dto);
            System.out.println("Resultado: " + resultado.getCodigoEstudiante());

            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("success", true);
            respuesta.put("mensaje", resultado.getMensaje());
            respuesta.put("data", resultado);

            return ResponseEntity.ok(respuesta);

        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("mensaje", "Error al registrar: " + e.getMessage());

            return ResponseEntity.badRequest().body(error);
        }
    }
}
