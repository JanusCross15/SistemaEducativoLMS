import axios from "axios";

const API = "http://localhost:8081/api/alumnos-curso";

export const listarAlumnosCurso = (idCurso, idDocente) =>
    axios.get(`${API}?idCurso=${idCurso}&idDocente=${idDocente}`);
