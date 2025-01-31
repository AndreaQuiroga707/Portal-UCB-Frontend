import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarGestor from "../../componentes/NavbarGestor";
import { signIn } from "../../servicios/AuthService";
import { verificarRol } from "../../utils/authUtils";
import "./SignIn.css";

const CrearCuenta = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState(""); // Campo para el rol
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
        };
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
  /*useEffect(() => {
    // Verificar si el usuario tiene permisos
    if (!verificarRol("GESTOR DE USUARIOS")) {
      setTienePermiso(false); // No tiene permiso
      setTimeout(() => navigate("/login"), 3000); // Redirige al login después de 3 segundos
    }
  }, [navigate]);*/

  const validateInstitutionEmail = (email) => {
    return email.endsWith("@ucb.edu.bo");
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (!validateInstitutionEmail(correoElectronico)) {
      setMensaje("El correo debe pertenecer al dominio @ucb.edu.bo.");
      return;
    }
  
    if (!validatePassword(password)) {
      setMensaje(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }
  
    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }
  
    if (!rol) {
      setMensaje("Debes seleccionar un rol para el usuario.");
      return;
    }
  
    try {
      // Crear un objeto con solo los campos necesarios
      const datosUsuario = {
        nombre,
        apellido,
        correoElectronico,
        password,
        rol,
      };
  
      // Enviar los datos al backend
      await signIn(datosUsuario);
  
      setMensaje("Registro exitoso.");
      navigate("/gestor/usuarios");
    } catch (error) {
      console.error("Error al registrar usuario:", error.response?.data || error.message);
      setMensaje(error.response?.data?.mensaje || "Error al registrar el usuario. Inténtalo nuevamente.");
    }
  };
  

  
  return (
    <div>
      <NavbarGestor />
      <div className="crear-cuenta-container">
        <h1>Crear Cuenta</h1>
        {mensaje && <p className="error-message">{mensaje}</p>}
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Correo institucional:</label>
            <input
              type="email"
              id="email"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="rol">Rol:</label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="">Seleccionar un rol</option>
              <option value="ADMIN">ADMIN</option>
              <option value="ADMIN2">ADMIN2</option>
            </select>
          </div>
          <button type="submit" className="botonLogin">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default CrearCuenta;

/*
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarGestor from "../../componentes/NavbarGestor";
import { signIn } from "../../servicios/AuthService";
import { verificarRol } from "../../utils/authUtils";
import "./SignIn.css";

const CrearCuenta = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tienePermiso, setTienePermiso] = useState(true); // Estado para verificar permisos
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario tiene permisos
    if (!verificarRol("GESTOR DE USUARIOS")) {
      setTienePermiso(false); // No tiene permiso
      setTimeout(() => navigate("/login"), 3000); // Redirige al login después de 3 segundos
    }
  }, [navigate]);

  const validateInstitutionEmail = (email) => {
    return email.endsWith("@ucb.edu.bo");
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateInstitutionEmail(correoElectronico)) {
      setMensaje("El correo debe pertenecer al dominio @ucb.edu.bo.");
      return;
    }

    if (!validatePassword(password)) {
      setMensaje(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      await signIn({ nombre, apellido, correoElectronico, password });
      setMensaje("Registro exitoso.");
      navigate("/gestor/usuarios");
    } catch (error) {
      setMensaje("Error al registrar el usuario. Inténtalo nuevamente.");
    }
  };

  if (!tienePermiso) {
    // Si el usuario no tiene permiso, muestra solo el mensaje
    return (
      <div className="no-access-container">
        <h1>No tienes permisos para acceder a esta página.</h1>
        <p>Redirigiendo al login...</p>
      </div>
    );
  }

  return (
    <div>
      <NavbarGestor />
      <div className="crear-cuenta-container">
        <h1>Crear Cuenta</h1>
        {mensaje && <p className="error-message">{mensaje}</p>}
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Correo institucional:</label>
            <input
              type="email"
              id="email"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="botonLogin">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default CrearCuenta;

*/