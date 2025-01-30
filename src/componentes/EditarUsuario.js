import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsuarioById, updateUsuario } from "../servicios/AuthService";
import "./EditarUsuario.css";

const EditarUsuario = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const [usuario, setUsuario] = useState(null); // Estado para almacenar los datos del usuario
  const [mensaje, setMensaje] = useState(""); // Estado para mostrar mensajes
  const navigate = useNavigate();

  // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await getUsuarioById(id); // Llamada al backend para obtener el usuario
        setUsuario(data);
      } catch (error) {
        setMensaje("Error al cargar los datos del usuario.");
      }
    };

    fetchUsuario();
  }, [id]);

  // Manejar el cambio de datos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Manejar el cambio de rol (corregido)
  const handleRolChange = (e) => {
    setUsuario({ ...usuario, rol: { rolId: parseInt(e.target.value, 10) } });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos enviados al backend:", usuario); // Para depuración
      await updateUsuario(usuario); // Llamada al backend para actualizar el usuario
      setMensaje("Usuario actualizado con éxito.");
      setTimeout(() => navigate("/gestor/usuarios"), 500); // Redirigir después de 2 segundos
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setMensaje("Error al actualizar el usuario.");
    }
  };

  if (!usuario) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className="editar-usuario-container">
      <h1>Editar Usuario</h1>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="editar-usuario-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={usuario.apellido || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="correoElectronico">Correo Electrónico:</label>
          <input
            type="email"
            id="correoElectronico"
            name="correoElectronico"
            value={usuario.correoElectronico || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rol">Rol:</label>
          <select id="rol" name="rol" value={usuario.rol?.rolId || ""} onChange={handleRolChange}>
            <option value="1">ADMIN</option>
            <option value="2">GESTOR DE USUARIOS</option>
          </select>
        </div>
        <button type="submit" className="save-button">Guardar Cambios</button>
        <button type="button" className="cancel-button" onClick={() => navigate("/gestor/usuarios")}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarUsuario;

/*import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsuarioById, updateUsuario } from "../servicios/AuthService";
import "./EditarUsuario.css";

const EditarUsuario = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const [usuario, setUsuario] = useState(null); // Estado para almacenar los datos del usuario
  const [mensaje, setMensaje] = useState(""); // Estado para mostrar mensajes
  const navigate = useNavigate();

  // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await getUsuarioById(id); // Llamada al backend para obtener el usuario
        setUsuario(data);
      } catch (error) {
        setMensaje("Error al cargar los datos del usuario.");
      }
    };

    fetchUsuario();
  }, [id]);

  // Manejar el cambio de datos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Manejar el cambio de rol
  const handleRolChange = (e) => {
    setUsuario({ ...usuario, rol: parseInt(e.target.value, 10) });
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos enviados al backend:", usuario); // Verifica el objeto enviado
      await updateUsuario(usuario); // Llamada al backend para actualizar el usuario
      setMensaje("Usuario actualizado con éxito.");
      setTimeout(() => navigate("/gestor/usuarios"), 2000); // Redirigir después de 2 segundos
    } catch (error) {
      console.error("Error al actualizar el usuario:", error); // Agregar logging
      setMensaje("Error al actualizar el usuario.");
    }
  };
  

  if (!usuario) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className="editar-usuario-container">
      <h1>Editar Usuario</h1>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="editar-usuario-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={usuario.apellido || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="correoElectronico">Correo Electrónico:</label>
          <input
            type="email"
            id="correoElectronico"
            name="correoElectronico"
            value={usuario.correoElectronico || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rol">Rol:</label>
          <select id="rol" name="rol" value={usuario.rol} onChange={handleRolChange}>
            <option value="1">ADMIN</option>
            <option value="2">GESTOR DE USUARIOS</option>
          </select>
        </div>
        <button type="submit" className="save-button">Guardar Cambios</button>
        <button type="button" className="cancel-button" onClick={() => navigate("/gestor/usuarios")}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarUsuario;*/