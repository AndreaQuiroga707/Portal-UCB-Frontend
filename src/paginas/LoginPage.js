import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../servicios/AuthService"; // Función para consumir el backend
import { jwtDecode } from "jwt-decode"; // Para decodificar el token JWT
import '../App.css'; // Archivo CSS para estilos

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const validateInstitutionEmail = (email) => {
    return email.endsWith("@ucb.edu.bo"); // Verifica si el correo pertenece al dominio institucional
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInstitutionEmail(correoElectronico)) {
      setMensaje("Debes usar un correo institucional @ucb.edu.bo.");
      return;
    }

    try {
      const data = await login(correoElectronico, password);
      localStorage.setItem("token", data.token); // Guarda el token JWT
      setMensaje("Inicio de sesión exitoso");

      const decodedToken = jwtDecode(data.token);
      const userRole = decodedToken.role; // Extraer el rol como string




      console.log("Decoded Token:", decodedToken); // Verifica todo el contenido del token decodificado
      console.log("User Role:", userRole); // Verifica el rol exacto
    
      // Mostrar temporalmente el rol devuelto en el mensaje
      setMensaje(`Tu rol es: ${userRole}`);










      // Redirigir según el rol
      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "GESTOR DE USUARIOS") {
        navigate("/gestor/usuarios");
      } else {
        setMensaje("No tienes permisos para acceder a esta aplicación.");
      }
    } catch (error) {
      setMensaje("Error de autenticación. Verifica tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img
          src={require("../imagenes/UCB-Horizontal.png")}
          alt="Logo"
          className="navbar-logo"
        />
      </div>
      <h1>Welcome</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            id="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="botonLogin">Continue</button>
      </form>
      {mensaje && <p className="error-message">{mensaje}</p>}
    </div>
  );
};

export default Login;


/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../servicios/AuthService"; // Función para consumir el backend
import '../App.css'; // Archivo CSS para estilos

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // Función para validar el dominio del correo (opcional)
  const validateInstitutionEmail = (email) => {
    return email.endsWith("@ucb.edu.bo"); // Verifica si el correo pertenece al dominio institucional
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación opcional del dominio
    if (!validateInstitutionEmail(correoElectronico)) {
      setMensaje("Debes usar un correo institucional @ucb.edu.bo.");
      return;
    }

    try {
      const data = await login(correoElectronico, password);
      localStorage.setItem("token", data.token); // Guarda el token JWT
      setMensaje("Inicio de sesión exitoso");

      const userRole = "user"; // Cambia esto cuando integres los roles
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/SigninPage");
      }
    } catch (error) {
      setMensaje("Error de autenticación. Verifica tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img
          src={require("../imagenes/UCB-Horizontal.png")}
          alt="Logo"
          className="navbar-logo"
        />
      </div>
      <h1>Welcome</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            id="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="botonLogin">Continue</button>
      </form>
      {mensaje && <p className="error-message">{mensaje}</p>}
    </div>
  );
};

export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar después del login
import { login } from "../servicios/AuthService"; // Función para consumir el backend

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(correoElectronico, password);
      localStorage.setItem("token", data.token); // Guarda el token JWT en el navegador
      setMensaje("Inicio de sesión exitoso");
      
      // Decodifica el token si contiene roles (opcional, usando jwt-decode)
      const userRole = "user"; // Aquí podrías determinar el rol del usuario desde el token o backend
      
      // Redirecciona según el rol
      if (userRole === "admin") {
        navigate("/admin"); // Redirige al dashboard de administrador
      } else {
        navigate("/"); // Redirige al dashboard de usuario normal
      }
    } catch (error) {
      setMensaje(error);
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Login;
*/