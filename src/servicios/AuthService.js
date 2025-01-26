import api from "./api"; // Asegúrate de tener configurado Axios

// Función para el login
export const login = async (correoElectronico, password) => {
  try {
    const response = await api.post("/auth", { correoElectronico, password });
    return response.data; // Devuelve el token JWT u otros datos según tu backend
  } catch (error) {
    throw error.response?.data?.mensaje || "Error de autenticación";
  }
};
