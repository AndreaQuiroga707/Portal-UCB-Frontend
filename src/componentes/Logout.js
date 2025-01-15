import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LOGOUT from '../imagenes/logout.png';

export const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
        // Borrar el token del localStorage
        localStorage.removeItem('authToken');

        // Hacer logout
        logout({ returnTo: window.location.origin });
    };

    return (
        <button 
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                position: 'fixed', // Fija la posición en la ventana
                top: '10px', // Ajusta la posición desde arriba
                right: '10px', // Ajusta la posición desde la derecha
            }}
            onClick={handleLogout}
        >
            <img src={LOGOUT} alt="Logout" style={{ width: '40px', height: '40px' }} />
        </button>
    );
};
