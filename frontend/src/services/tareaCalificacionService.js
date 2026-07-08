import axios from "axios";

const API = "http://localhost:8081/api/tarea-calificacion";

export const registrarTareaConCalificaciones = (data) =>
    axios.post(API, data);
