import axios from "axios";

const API =
  "http://localhost:8081/api/solicitudes";

// ======================================
// SOLICITUDES
// ======================================

export const listarSolicitudes = () =>
  axios.get(API);

export const registrarSolicitud = (
  idUsuario,
  idEstudiante
) =>
  axios.post(
    `${API}/registrar?idUsuario=${idUsuario}&idEstudiante=${idEstudiante}`
  );

export const eliminarSolicitud = (id) =>
  axios.delete(`${API}/${id}`);

export const aprobarSolicitud = (id) =>
  axios.put(`${API}/${id}/aprobar`);

export const rechazarSolicitud = (id) =>
  axios.put(`${API}/${id}/rechazar`);

// ======================================
// SOLO PARA ADMIN
// ======================================

export const listarPadres = () =>
  axios.get(`${API}/padres`);

export const listarEstudiantes = () =>
  axios.get(`${API}/estudiantes`);