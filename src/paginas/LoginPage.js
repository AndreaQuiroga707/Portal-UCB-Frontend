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

      // Redirigir según el rol
      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "ADMIN2") {
        navigate("/admin/investigacion");
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



/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, requestResetToken, resetPasswordWithToken } from "../servicios/AuthService"; // Importar las funciones
import Modal from "../componentes/Modal"; // Modal personalizado (descrito abajo)
import "../App.css";

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false); // Mostrar modal para desbloqueo
  const [token, setToken] = useState(""); // Token para desbloqueo
  const [newPassword, setNewPassword] = useState(""); // Nueva contraseña para desbloqueo

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(correoElectronico, password);
      localStorage.setItem("token", data.token); // Guardar token en localStorage
      setMensaje("Inicio de sesión exitoso");
      const userRole = data.role; // Extraer el rol del token decodificado
      if (userRole === "ADMIN") navigate("/admin");
      else if (userRole === "GESTOR DE USUARIOS") navigate("/gestor/usuarios");
    } catch (error) {
      if (error.response?.status === 403) {
        setMensaje("Tu cuenta está bloqueada. Usa el botón de desbloqueo.");
      } else {
        setMensaje("Error de autenticación. Verifica tus credenciales.");
      }
    }
  };

  const handleDesbloqueo = async () => {
    try {
      await requestResetToken({ email: correoElectronico });
      setMensaje("Se envió un token a tu correo.");
      setMostrarModal(true); // Mostrar modal para ingresar el token y la nueva contraseña
    } catch (error) {
      setMensaje("Error al solicitar el token. Inténtalo nuevamente.");
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPasswordWithToken({ token, newPassword });
      setMensaje("Contraseña actualizada correctamente. Por favor, inicia sesión.");
      setMostrarModal(false);
    } catch (error) {
      setMensaje("Error al restablecer la contraseña. Verifica el token o inténtalo nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Correo:</label>
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
        <button type="submit" className="botonLogin">Iniciar Sesión</button>
      </form>
      <button onClick={handleDesbloqueo} className="desbloqueo-button">
        Desbloquear Cuenta
      </button>
      {mensaje && <p className="error-message">{mensaje}</p>}

     
      {mostrarModal && (
        <Modal onClose={() => setMostrarModal(false)}>
          <h2>Desbloquear Cuenta</h2>
          <p>Ingresa el token enviado a tu correo y tu nueva contraseña:</p>
          <div className="input-group">
            <label htmlFor="token">Token:</label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={handleResetPassword} className="botonLogin">Restablecer Contraseña</button>
        </Modal>
      )}
    </div>
  );
};

export default Login;
*/
