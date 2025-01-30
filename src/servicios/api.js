import axios from "axios";

// Configuración de Axios
const api = axios.create({
  baseURL: "https://portal-ucb-backend.onrender.com/api/v1/usuario", // URL base de las APIs
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
