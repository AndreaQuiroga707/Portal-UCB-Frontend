import React from "react";
import ImagePanel from '../componentes/ImagePanel/ImagePanel';
import Panel from '../componentes/Panel/Panel';
import SistemasVirtuales from '../componentes/SistemasVirtuales'; // Asegúrate de ajustar la ruta correcta

const PlataformaEnLinea = () => {
    return (
        <div>
            {/* <NavbarComponent /> */}
            <ImagePanel title="Plataforma de Aprendizaje en Línea" />
            <Panel />
            {/* Contenido de la página de Plataforma en Línea */}
            <SistemasVirtuales />
        </div>
    );
}

export default PlataformaEnLinea;
