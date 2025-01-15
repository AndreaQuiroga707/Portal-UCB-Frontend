import React from 'react';
import Componente from '../componentes/Componente.js';
import ImagePanel from '../componentes/ImagePanel/ImagePanel';
import '../App.css';

const RecursosEstudiantes = () => {
  return (
    <div>
      <ImagePanel title="Recurso de Estudiantes"/>
      <Componente />
      {/* Agrega aquí el contenido específico para la sección de recursos para estudiantes */}
    </div>
  );
}

export default RecursosEstudiantes;
