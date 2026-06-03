package backend.controller;

import backend.model.SolicitudMatricula;
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

    @GetMapping
    public List<SolicitudMatricula> listar() {

        return repository.findAll();
    }

    @PostMapping
    public SolicitudMatricula guardar(
            @RequestBody SolicitudMatricula solicitud
    ) {

        solicitud.setEstado("PENDIENTE");

        return repository.save(solicitud);
    }

    @PutMapping("/{id}/aprobar")
    public SolicitudMatricula aprobar(
            @PathVariable Integer id
    ) {

        SolicitudMatricula solicitud =
                repository.findById(id).orElse(null);

        if (solicitud == null)
            return null;

        solicitud.setEstado("APROBADA");

        return repository.save(solicitud);
    }

    @PutMapping("/{id}/rechazar")
    public SolicitudMatricula rechazar(
            @PathVariable Integer id
    ) {

        SolicitudMatricula solicitud =
                repository.findById(id).orElse(null);

        if (solicitud == null)
            return null;

        solicitud.setEstado("RECHAZADA");

        return repository.save(solicitud);
    }
}