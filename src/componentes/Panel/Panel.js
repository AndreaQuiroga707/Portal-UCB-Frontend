import React from 'react';
import './Panel.css';
import Laptop from '../../imagenes/laptop.png';
import interaccion from '../../imagenes/portal neo.png';
import neo from '../../imagenes/interaccion.png';

const Panel = () => {
  return (
    <div className="panel-container text-center">
      <h1></h1>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="feature">
            <h2>Entrega de Tareas en Línea</h2>
            <p></p>
            <div className="image-containerP">
              <img src={Laptop} alt="DELL Communication" className="image" />
              <div className="image-overlay">
                <p>¡Facilidad en la Entrega de Tareas! Con NEO, podrás enviar tus trabajos y proyectos directamente desde cualquier lugar. Sube documentos, videos, presentaciones y más, ¡todo en un solo lugar!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="feature">
            <h2>Interacción Directa</h2>
            <p></p>
            <div className="image-containerP">
              <img src={neo} alt="Placeholder B" className="image" />
              <div className="image-overlay">
                <p>Conéctate con tus Profesores en Tiempo Real. ¡Comunícate, haz preguntas y recibe respuestas rápidas! NEO facilita la interacción directa con tus profesores para aclarar dudas, discutir temas y obtener orientación académica</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="feature">
            <h2>Seguimiento de Progreso</h2>
            <p></p>
            <div className="image-containerP">
              <img src={interaccion} alt="Placeholder C" className="image" />
              <div className="image-overlay">
                <p>¡Controla tu Progreso Académico! NEO te ofrece un seguimiento personalizado de tus materias. Accede a informes, estadísticas y análisis de tu desempeño en cada asignatura, ¡todo para ayudarte a mejorar constantemente!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panel;
