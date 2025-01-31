import React, { useState, useEffect } from "react";
import NavbarGestor from "../../componentes/NavbarGestor";
import LogList from "./LogList";
import LogViewer from "./LogViewer";
import { verificarRol } from "../../utils/authUtils"; // Importar función de verificación
import { useNavigate } from "react-router-dom";

const LogsDashboard = () => {
    const [selectedLog, setSelectedLog] = useState(null);
    const [tienePermiso, setTienePermiso] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!verificarRol("GESTOR DE USUARIOS")) {
            setTienePermiso(false);
            setMensaje("No tienes permisos para acceder a esta página.");
            setTimeout(() => navigate("/login"), 3000);
        }
    }, [navigate]);

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
            <div className="gestion-logs-container">
                <h1>Logs del Sistema</h1>
                <LogList onSelect={setSelectedLog} />
                {selectedLog && <LogViewer filename={selectedLog} />}
            </div>
        </div>
    );
};

export default LogsDashboard;
