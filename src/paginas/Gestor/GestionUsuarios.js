import React, { useEffect, useState } from "react";
import NavbarGestor from "../../componentes/NavbarGestor";
import { getUsuarios } from "../../servicios/AuthService"; // Función para obtener usuarios
import { verificarRol } from "../../utils/authUtils"; // Verificar rol
import { useNavigate } from "react-router-dom";
import "./Tabla.css"; // Estilos para la tabla

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token desde localStorage:", localStorage.getItem("token"));
    console.log("Rol del usuario:", verificarRol("GESTOR DE USUARIOS"));

    // Verificar si el usuario tiene permisos
    if (!verificarRol("GESTOR DE USUARIOS")) {
      setMensaje("No tienes permisos para acceder a esta página. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        const usuariosConEstado = data.map((usuario) => ({
          ...usuario,
          estado: usuario.isLocked ? "Bloqueado" : "Activo",
        }));
        setUsuarios(usuariosConEstado);
      } catch (error) {
        setMensaje("Error al obtener la lista de usuarios.");
      }
    };

    fetchUsuarios();
  }, [navigate]);

  return (
    <div>
      <NavbarGestor />
      <div className="gestion-usuarios-container">
        <h1>Gestión de Usuarios</h1>
        {mensaje && <p className="error-message">{mensaje}</p>}
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.usuarioId}>
                  <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
                  <td>{usuario.correoElectronico}</td>
                  <td>{usuario.rol?.nombre || "Sin rol"}</td>
                  <td>{usuario.estado}</td>
                  <td>
                    <button className="edit-button">Editar</button>
                    <button className="delete-button">Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay usuarios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionUsuarios;



/*import React, { useEffect, useState } from "react";
import NavbarGestor from "../../componentes/NavbarGestor";
import { getUsuarios } from "../../servicios/AuthService"; // Función para obtener usuarios
import { useNavigate } from "react-router-dom"; // Para redirigir al login
import { verificarRol } from "../../utils/authUtils"; // Función para verificar el rol
import "./Tabla.css"; // Estilos para la tabla

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado para la lista de usuarios
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de error o éxito
  const navigate = useNavigate(); // Hook para redirección

  // Validar el rol al cargar la página
  useEffect(() => {
    if (!verificarRol("GESTOR DE USUARIOS")) {
      setMensaje("Acceso denegado. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 3000); // Redirige al login después de 3 segundos
      return;
    }

    // Obtener la lista de usuarios
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        // Asignar valores por defecto para estado si está vacío
        const usuariosConEstado = data.map((usuario) => ({
          ...usuario,
          estado: usuario.isLocked ? "Bloqueado" : "Activo", // Estado basado en isLocked
        }));
        setUsuarios(usuariosConEstado); // Guardar la lista de usuarios en el estado
      } catch (error) {
        setMensaje("Error al obtener la lista de usuarios. Intenta nuevamente.");
      }
    };

    fetchUsuarios();
  }, [navigate]);

  return (
    <div>

      <div className="gestion-usuarios-container">
        <h1>Gestión de Usuarios</h1>
        {mensaje && <p className="error-message">{mensaje}</p>}
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.usuarioId}>
                  <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
                  <td>{usuario.correoElectronico}</td>
                  <td>{usuario.rol?.nombre || "Sin rol"}</td>
                  <td>{usuario.estado}</td> 
                  <td>
                    <button className="edit-button">Editar</button>
                    <button className="delete-button">Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay usuarios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionUsuarios;
*/

