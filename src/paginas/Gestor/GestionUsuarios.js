import React, { useEffect, useState } from "react";
import NavbarGestor from "../../componentes/NavbarGestor";
import { getUsuarios, deleteUsuario } from "../../servicios/AuthService"; // Importar función para eliminar usuario
import { verificarRol } from "../../utils/authUtils"; // Verificar rol
import { useNavigate } from "react-router-dom";
import "./Tabla.css"; // Estilos para la tabla

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tienePermiso, setTienePermiso] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario tiene permisos
    if (!verificarRol("GESTOR DE USUARIOS")) {
      setTienePermiso(false);
      setMensaje("No tienes permisos para acceder a esta página.");
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

  // Función para eliminar usuario
  const handleDelete = async (usuarioId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        await deleteUsuario(usuarioId);
        setUsuarios(usuarios.filter((usuario) => usuario.usuarioId !== usuarioId)); // Actualizar la lista
        window.alert("Usuario eliminado con éxito."); // Muestra una alerta
      } catch (error) {
        window.alert("Error al eliminar el usuario.");
      }
    }
  };
  

  if (!tienePermiso) {
    return (
      <div className="no-access-container">
        <h1>{mensaje}</h1>
        <p>Redirigiendo al login...</p>
      </div>
    );
  }

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
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/editar-usuario/${usuario.usuarioId}`)}
                    >
                      Editar
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(usuario.usuarioId)}>
                      Eliminar
                    </button>
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
import { verificarRol } from "../../utils/authUtils"; // Verificar rol
import { useNavigate } from "react-router-dom";
import "./Tabla.css"; // Estilos para la tabla

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tienePermiso, setTienePermiso] = useState(true); // Estado para verificar permisos
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario tiene permisos
    if (!verificarRol("GESTOR DE USUARIOS")) {
      setTienePermiso(false); // No tiene permiso
      setMensaje("No tienes permisos para acceder a esta página.");
      setTimeout(() => navigate("/login"), 3000); // Redirige al login después de 3 segundos
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

  if (!tienePermiso) {
    // Si no tiene permiso, solo muestra el mensaje de acceso denegado
    return (
      <div className="no-access-container">
        <h1>{mensaje}</h1>
        <p>Redirigiendo al login...</p>
      </div>
    );
  }

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
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/editar-usuario/${usuario.usuarioId}`)}
                  >
                    Editar
                  </button>

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