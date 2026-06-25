package backend.controller;

import backend.model.Padre;
import backend.model.Estudiante;
import backend.model.SolicitudMatricula;

import backend.repository.PadreRepository;
import backend.repository.EstudianteRepository;
import backend.repository.SolicitudMatriculaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
@CrossOrigin("*")
public class SolicitudMatriculaController {

    @Autowired
    private SolicitudMatriculaRepository repository;

    @Autowired
    private PadreRepository padreRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    // =========================================
    // LISTAR SOLICITUDES
    // =========================================

    @GetMapping
    public List<SolicitudMatricula> listar() {

        return repository.findAll();
    }

    // =========================================
    // LISTAR PADRES (COMBOBOX)
    // =========================================

    @GetMapping("/padres")
    public List<Padre> listarPadres() {

        return padreRepository.findAll();
    }

    // =========================================
    // LISTAR ESTUDIANTES (COMBOBOX)
    // =========================================

    @GetMapping("/estudiantes")
    public List<Estudiante> listarEstudiantes() {

        return estudianteRepository.findAll();
    }

    // =========================================
    // REGISTRAR SOLICITUD DESDE PADRE LOGUEADO
    // =========================================

    @PostMapping("/registrar")
    public SolicitudMatricula registrarSolicitud(
            @RequestParam Integer idUsuario,
            @RequestParam Integer idEstudiante) {

        Padre padre = padreRepository.findByUsuario_IdUsuario(
                idUsuario);

        if (padre == null) {
            return null;
        }

        Estudiante estudiante = estudianteRepository.findById(
                idEstudiante)
                .orElse(null);

        if (estudiante == null) {
            return null;
        }

        SolicitudMatricula solicitud = new SolicitudMatricula();

        solicitud.setPadre(padre);

        solicitud.setEstudiante(estudiante);

        solicitud.setEstado("PENDIENTE");

        solicitud.setFechaSolicitud(
                java.time.LocalDate.now());

        return repository.save(solicitud);
    }

    // =========================================
    // APROBAR
    // =========================================

    @PutMapping("/{id}/aprobar")
    public SolicitudMatricula aprobar(
            @PathVariable Integer id) {

        SolicitudMatricula solicitud = repository.findById(id).orElse(null);

        if (solicitud == null)
            return null;

        solicitud.setEstado("APROBADA");

        return repository.save(solicitud);
    }

    // =========================================
    // RECHAZAR
    // =========================================

    @PutMapping("/{id}/rechazar")
    public SolicitudMatricula rechazar(
            @PathVariable Integer id) {

        SolicitudMatricula solicitud = repository.findById(id).orElse(null);

        if (solicitud == null)
            return null;

        solicitud.setEstado("RECHAZADA");

        return repository.save(solicitud);
    }

    // =========================================
    // ELIMINAR
    // =========================================

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Integer id) {

        repository.deleteById(id);
    }
}