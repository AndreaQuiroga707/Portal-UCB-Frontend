import React from 'react';
import Card from 'react-bootstrap/Card';

function CardResearchInstitute(props) {
  // Función para convertir las líneas de investigación en una lista con viñetas
  const renderLineasInvestigacion = () => {
    const lineasInvestigacionArray = props.lineasInvestigacion.split(';');
    return (
      <ul>
        {lineasInvestigacionArray.map((linea, index) => (
          <li key={index}>{linea.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={props.enlaceImagen} />
      <Card.Body>
        <div className="titulos">
          {/* Verificar si hay un enlace antes de renderizar el componente <a> */}
          {props.enlaceWeb ? (
            <h4><a href={props.enlaceWeb} target="_blank" rel="noopener noreferrer">{props.nombre}</a></h4>
          ) : (
            <h4>{props.nombre}</h4>
          )}
        </div>
        {/* Renderizar la lista directamente aquí, fuera de cualquier párrafo */}
        <strong>Líneas de Investigación:</strong>
        {renderLineasInvestigacion()}
        <Card.Text>
          {props.descripcion}
          <br />
          {props.carrera.nombre}
          <br />
          <strong>Contacto:</strong> {props.contacto.nombre}
          <br />
          {props.contacto.correo}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardResearchInstitute;
