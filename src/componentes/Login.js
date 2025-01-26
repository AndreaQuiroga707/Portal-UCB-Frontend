import React from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import SV012 from '../imagenes/SV012.png';
import '../SistemasVirtuales.css';

export const LoginButton = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleLoginClick = () => {
    navigate("/login"); // Redirige a la ruta de la página de login
  };

  return (
    <button className="new-button" onClick={handleLoginClick}>
      <img src={SV012} alt="Login" />
    </button>
  );
};

/*
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SV012 from '../imagenes/SV012.png';
import '../SistemasVirtuales.css';

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button className="new-button" onClick={() => loginWithRedirect({redirectUri: 'http://localhost:3000/admin'})}>
        <img src={SV012} alt="Login" />
      </button>
    );
}; */