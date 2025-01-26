import axios from "axios";

// Configuración de Axios
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/usuario", // Cambia esta URL a la de tu backend
});

// Interceptores opcionales: Para agregar el token JWT en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Recupera el token del localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado Authorization
  }
  return config;
});

export default api;
