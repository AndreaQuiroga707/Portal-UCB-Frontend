import React from 'react';
import './ImagePanel.css'; // Ruta al archivo CSS de estilos del ImagePanel
import PanelImage from '../../imagenes/panel.png' // Ruta a la imagen Panel.png

function ImagePanel(props) {
  return (
    <div className="containersub">
      <h2 className='h2conteiner'>{props.title}</h2>
    </div>
  );
}

export default ImagePanel;
