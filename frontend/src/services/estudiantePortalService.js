import axios from "axios";

const API_ESTUDIANTES = "http://localhost:8081/api/estudiantes";
const API_CALIFICACIONES = "http://localhost:8081/api/calificaciones";
const API_TAREAS = "http://localhost:8081/api/tareas";
const API_MATERIALES = "http://localhost:8081/api/materiales";

// OBTENER ESTUDIANTE POR USUARIO
export const obtenerEstudiantePorUsuario = (idUsuario) => {
    return axios.get(`${API_ESTUDIANTES}/por-usuario/${idUsuario}`);
};

// OBTENER CALIFICACIONES DEL ESTUDIANTE (con info de tarea y curso)
export const listarCalificacionesEstudiante = (idEstudiante) => {
    return axios.get(`${API_CALIFICACIONES}/por-estudiante/${idEstudiante}`);
};

// OBTENER TAREAS POR CURSO
export const listarTareasPorCurso = (idCurso) => {
    return axios.get(`${API_TAREAS}/por-curso/${idCurso}`);
};

// OBTENER MATERIALES POR CURSO
export const listarMaterialesPorCurso = (idCurso) => {
    return axios.get(`${API_MATERIALES}/por-curso/${idCurso}`);
};

// OBTENER TODAS LAS TAREAS
export const listarTareas = () => {
    return axios.get(API_TAREAS);
};

// OBTENER TODOS LOS MATERIALES
export const listarMateriales = () => {
    return axios.get(API_MATERIALES);
};

// OBTENER TODOS LOS CURSOS
export const listarCursos = () => {
    return axios.get("http://localhost:8081/api/cursos");
};
