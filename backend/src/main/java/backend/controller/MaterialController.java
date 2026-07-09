package backend.controller;

import backend.model.Material;
import backend.repository.MaterialRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales")
@CrossOrigin(origins = "http://localhost:5173")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    // LISTAR POR CURSO
    @GetMapping("/por-curso/{idCurso}")
    public List<Material> listarMaterialesPorCurso(@PathVariable Integer idCurso) {
        return materialRepository.findByCurso(idCurso);
    }

    // LISTAR
    @GetMapping
    public List<Material> listarMateriales() {
        return materialRepository.findAll();
    }

    // GUARDAR
    @PostMapping
    public Material guardarMaterial(@RequestBody Material material) {
        return materialRepository.save(material);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Material obtenerMaterial(@PathVariable Long id) {
        return materialRepository.findById(id).orElse(null);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Material actualizarMaterial(@PathVariable Long id,
                                       @RequestBody Material datos) {

        Material material = materialRepository.findById(id).orElse(null);

        if (material != null) {

            material.setTitulo(datos.getTitulo());
            material.setDescripcion(datos.getDescripcion());
            material.setArchivo(datos.getArchivo());

            return materialRepository.save(material);
        }

        return null;
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public String eliminarMaterial(@PathVariable Long id) {

        materialRepository.deleteById(id);

        return "Material eliminado correctamente";
    }
}