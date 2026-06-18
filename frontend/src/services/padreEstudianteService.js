import axios from "axios";

const API =
  "http://localhost:8081/api/padre-estudiante";

export const listarVinculos = () =>
  axios.get(API);

export const guardarVinculo = (data) =>
  axios.post(API, data);

export const eliminarVinculo = (id) =>
  axios.delete(`${API}/${id}`);