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

// Función para registrar usuarios (Sign In)
export const signIn = async ({ nombre, apellido, correoElectronico, password, rol}) => {
  try {
    const response = await api.post("/nuevo", { 
      nombre, 
      apellido, 
      correoElectronico, 
      password,
      rol
    });
    return response.data; // Devuelve un mensaje de éxito o los datos del usuario creado
  } catch (error) {
    throw error.response?.data?.mensaje || "Error al registrar el usuario";
  }
};

// Función para obtener usuarios
export const getUsuarios = async () => {
  try {
    const response = await api.get("/"); // Llama a la ruta protegida
    return response.data.data; // Devuelve solo la lista de usuarios
  } catch (error) {
    throw error.response?.data?.message || "Error al obtener usuarios";
  }
};


export const requestResetToken = async (email) => {
  const response = await api.post("/new/token", email);
  return response.data;
};

export const resetPasswordWithToken = async (data) => {
  const response = await api.post("/new/token/password", data);
  return response.data;
};
