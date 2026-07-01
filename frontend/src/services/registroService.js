import axios from "axios";

const API = "http://localhost:8081/api/registro";

export const registrarEstudianteCompleto = (data) =>
    axios.post(API, data);
