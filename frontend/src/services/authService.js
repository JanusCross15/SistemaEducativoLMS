import axios from "axios";

const API = "http://localhost:8081/api/login";

export const login = async (datos) => {
    return await axios.post(API, datos);
};