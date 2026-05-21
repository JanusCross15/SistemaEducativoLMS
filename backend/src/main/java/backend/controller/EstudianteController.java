package backend.controller;

import backend.model.Estudiante;
import backend.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin("*")
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @GetMapping
    public List<Estudiante> listarEstudiantes() {
        return estudianteRepository.findAll();
    }

    @PostMapping
    public Estudiante guardarEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @PutMapping("/{id}")
    public Estudiante actualizarEstudiante(@PathVariable Integer id,
                                           @RequestBody Estudiante estudianteActualizado) {

        Estudiante estudiante = estudianteRepository.findById(id).orElse(null);

        if (estudiante == null) {
            return null;
        }

        estudiante.setCodigoEstudiante(estudianteActualizado.getCodigoEstudiante());
        estudiante.setApellidoPaterno(estudianteActualizado.getApellidoPaterno());
        estudiante.setApellidoMaterno(estudianteActualizado.getApellidoMaterno());
        estudiante.setNombres(estudianteActualizado.getNombres());
        estudiante.setFechaNacimiento(estudianteActualizado.getFechaNacimiento());
        estudiante.setProvincia(estudianteActualizado.getProvincia());
        estudiante.setDepartamento(estudianteActualizado.getDepartamento());
        estudiante.setDistrito(estudianteActualizado.getDistrito());
        estudiante.setSexo(estudianteActualizado.getSexo());
        estudiante.setEdad(estudianteActualizado.getEdad());
        estudiante.setDireccion(estudianteActualizado.getDireccion());
        estudiante.setMatricula(estudianteActualizado.getMatricula());

        return estudianteRepository.save(estudiante);
    }

    @DeleteMapping("/{id}")
    public void eliminarEstudiante(@PathVariable Integer id) {
        estudianteRepository.deleteById(id);
    }
}