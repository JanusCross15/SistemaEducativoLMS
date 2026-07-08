package backend.service;

import backend.dto.TareaCalificacionDTO;
import backend.dto.ResultadoTareaDTO;
import backend.repository.TareaCalificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TareaCalificacionService {

    @Autowired
    private TareaCalificacionRepository repository;

    public ResultadoTareaDTO registrarTarea(TareaCalificacionDTO dto) {
        return repository.registrarTareaConCalificaciones(dto);
    }
}
