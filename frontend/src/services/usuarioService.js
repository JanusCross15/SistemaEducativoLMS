import axios from "axios";

const API =
  "http://localhost:8081/api/usuarios";

export const listarUsuarios = () =>
  axios.get(API);

export const guardarUsuario = (data) =>
  axios.post(API, data);

export const obtenerUsuario = (id) =>
  axios.get(`${API}/${id}`);

export const actualizarUsuario = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const eliminarUsuario = (id) =>
  axios.delete(`${API}/${id}`);