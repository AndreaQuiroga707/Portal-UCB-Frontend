import api from "./api"; // Cliente Axios configurado

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
export const signIn = async ({ nombre, apellido, correoElectronico, password, rol }) => {
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

// Función para obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await api.get("/"); // Llama a la ruta protegida
    return response.data.data; // Devuelve solo la lista de usuarios
  } catch (error) {
    throw error.response?.data?.message || "Error al obtener usuarios";
  }
};

// Función para obtener un usuario por su ID
export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`/${id}`); // Llama a la API con el ID del usuario
    return response.data.data; // Devuelve los datos del usuario
  } catch (error) {
    throw error.response?.data?.message || "Error al obtener el usuario";
  }
};

// Función para actualizar un usuario
export const updateUsuario = async (usuario) => {
  try {
    const response = await api.put("/", usuario); // Verifica si la URL es correcta
    return response.data;
  } catch (error) {
    console.error("Error en updateUsuario:", error);
    throw error;
  }
};


// Función para solicitar un token de restablecimiento de contraseña
export const requestResetToken = async (email) => {
  const response = await api.post("/new/token", email);
  return response.data;
};

// Función para restablecer la contraseña con un token
export const resetPasswordWithToken = async (data) => {
  const response = await api.post("/new/token/password", data);
  return response.data;
};
// Función para eliminar un usuario por su ID
export const deleteUsuario = async (id) => {
  try {
    const response = await api.delete(`/${id}`); // Llama al endpoint DELETE
    return response.data;
  } catch (error) {
    console.error("Error en deleteUsuario:", error);
    throw error;
  }
};
