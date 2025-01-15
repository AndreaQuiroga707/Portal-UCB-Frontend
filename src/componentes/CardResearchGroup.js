import React from 'react';
import Card from 'react-bootstrap/Card';

function CardResearchGroup(props) {


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={props.enlaceImagen} />
      <Card.Body>
        <div className="titulos">
          {/* Corregir de src a href */}
          {/* Verificar si hay un enlace antes de renderizar el componente <a> */}
          {props.enlaceWeb ? (
            <h4><a href={props.enlaceWeb} target="_blank" rel="noopener noreferrer">{props.nombre}</a></h4>
          ) : (
            <h4>{props.nombre}</h4>
          )}
        </div>
        {/* Renderizar la lista directamente aquí, fuera de cualquier párrafo */}
        <Card.Text>
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

export default CardResearchGroup;
