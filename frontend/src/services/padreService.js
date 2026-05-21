import axios from "axios";

const API =
  "http://localhost:8081/api/padres";

// LISTAR

export const listarPadres = () =>
  axios.get(API);

// GUARDAR

export const guardarPadre = (data) =>
  axios.post(API, data);

// ACTUALIZAR

export const actualizarPadre = (id, data) =>
  axios.put(`${API}/${id}`, data);

// ELIMINAR

export const eliminarPadre = (id) =>
  axios.delete(`${API}/${id}`);