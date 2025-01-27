import { jwtDecode } from "jwt-decode";


export const verificarRol = (rolRequerido) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false; // No hay token, no está autenticado
  }

  try {
    const decodedToken = jwtDecode(token); // Decodifica el token
    const userRole = decodedToken.role; // Accede al campo "role"
    return userRole === rolRequerido; // Compara con el rol requerido
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false;
  }
};
