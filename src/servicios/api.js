import axios from "axios";

// Configuración de Axios
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/usuario", // URL base de las APIs
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Recupera el token del localStorage
  console.log("Token enviado:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado Authorization
  }
  return config;
});

export default api;
