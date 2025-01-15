import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CardComponent(props) {
  const formattedStartDate = new Date(props.fechaInicio).toLocaleDateString();
  const formattedEndDate = new Date(props.fechaFin).toLocaleDateString();
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.enlaceImagen} />
        <Card.Body>
          <Container className="titulos">
            <h4>
              <Card.Title>{props.title}</Card.Title>
            </h4>
          </Container>
          <Card.Text>
            <p>
              <strong>Fecha de inicio:</strong> {formattedStartDate}
            </p>
            <p>
              <strong>Fecha de fin:</strong> {formattedEndDate}
            </p>
            <p>
              <Button variant="link" onClick={handleModalShow}>
                Ver descripción
              </Button>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Fecha de inicio:</strong> {formattedStartDate}
          </p>
          <p>
            <strong>Fecha de fin:</strong> {formattedEndDate}
          </p>
          <p>{props.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardComponent;
