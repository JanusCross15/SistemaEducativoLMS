import axios from "axios";

const API =
  "http://localhost:8081/api/matriculas";

// LISTAR

export const listarMatriculas = () =>
  axios.get(API);

// GUARDAR

export const guardarMatricula = (data) =>
  axios.post(API, data);

// ACTUALIZAR

export const actualizarMatricula = (id, data) =>
  axios.put(`${API}/${id}`, data);

// ELIMINAR

export const eliminarMatricula = (id) =>
  axios.delete(`${API}/${id}`);