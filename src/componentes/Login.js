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
};