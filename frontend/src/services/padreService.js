import axios from "axios";

const API =
  "http://localhost:8081/api/padres";

// ======================================
// CRUD PADRES
// ======================================

export const listarPadres = () =>
  axios.get(API);

export const guardarPadre = (data) =>
  axios.post(API, data);

export const actualizarPadre = (
  id,
  data
) =>
  axios.put(`${API}/${id}`, data);

export const eliminarPadre = (id) =>
  axios.delete(`${API}/${id}`);

// ======================================
// HIJOS DEL PADRE LOGUEADO
// ======================================

export const obtenerHijos = (
  idUsuario
) =>
  axios.get(
    `${API}/usuario/${idUsuario}/hijos`
  );