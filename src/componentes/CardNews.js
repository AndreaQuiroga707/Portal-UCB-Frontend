import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

function CardNews(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const handleVerNoticia = () => {
    setSelectedNews({
      title: props.title,
      description: props.description,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src={props.enlaceImagen} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.fechaPublicacion}</Card.Text>
          <Button variant="link" onClick={handleVerNoticia}>
            Ver noticia
          </Button>
        </Card.Body>
      </Card>

      {/* Modal para mostrar la noticia completa */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedNews && selectedNews.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedNews && selectedNews.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardNews;
