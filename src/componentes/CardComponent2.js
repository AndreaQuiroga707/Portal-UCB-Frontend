import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CardComponent2.css';

const CardComponent2 = ({ title, colorClass, carreras }) => {
  const carrerasList = Array.isArray(carreras) ? carreras : [];

  return (
    <Card className={`custom-card ${colorClass}`}>
      <Card.Header as="h5" className="custom-card-header">{title}</Card.Header>
      <Card.Body className="custom-card-body">
        <ul className="lista-carreras">
          {carrerasList.length > 0 ? carrerasList.map((carrera, index) => (
            <Link key={index} to={`/carrera/${carrera.carreraId}`}>
              <li className={`carrera-item ${colorClass}`}>{carrera.nombre}</li>
            </Link>
          )) : <li>No hay carreras disponibles.</li>}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default CardComponent2;
