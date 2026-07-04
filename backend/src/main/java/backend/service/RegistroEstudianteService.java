package backend.service;

import backend.dto.RegistroEstudianteDTO;
import backend.dto.ResultadoRegistroDTO;
import backend.repository.RegistroEstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistroEstudianteService {

    @Autowired
    private RegistroEstudianteRepository registroRepository;

    public ResultadoRegistroDTO registrarEstudiante(RegistroEstudianteDTO dto) {
        return registroRepository.registrarEstudianteCompleto(dto);
    }
}
