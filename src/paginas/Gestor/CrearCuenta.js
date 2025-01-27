import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarGestor from "../../componentes/NavbarGestor"; // Navbar para la vista del Gestor
import { signIn } from "../../servicios/AuthService"; // Función para consumir el backend
import "./SignIn.css"; // Archivo CSS para estilos

const CrearCuenta = () => {
  const [nombre, setNombre] = useState(""); // Campo para el nombre
  const [apellido, setApellido] = useState(""); // Campo para el apellido
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // Validar el dominio del correo
  const validateInstitutionEmail = (email) => {
    return email.endsWith("@ucb.edu.bo");
  };

  // Validar la complejidad de la contraseña
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validación del dominio del correo
    if (!validateInstitutionEmail(correoElectronico)) {
      setMensaje("El correo debe pertenecer al dominio @ucb.edu.bo.");
      return;
    }

    // Validación de la contraseña
    if (!validatePassword(password)) {
      setMensaje(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    // Validar que ambas contraseñas coincidan
    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Consumir el backend para registrar al usuario
      const data = await signIn({ nombre, apellido, correoElectronico, password });

      setMensaje("Registro exitoso.");
      navigate("/gestor/usuarios"); // Redirigir a la gestión de usuarios
    } catch (error) {
      setMensaje("Error al registrar el usuario. Inténtalo nuevamente.");
    }
  };

  return (
    <div>
      <NavbarGestor /> {/* Mantener el Navbar */}
      <div className="crear-cuenta-container">
        <h1>Crear Cuenta</h1>
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
        {mensaje && <p className="error-message">{mensaje}</p>}
      </div>
    </div>
  );
};

export default CrearCuenta;
