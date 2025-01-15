import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormEvento from './Forms/FormEvento';
import FormNoticia from './Forms/FormNoticia';
import FormInstitutoInvestigacion from './Forms/FormResearchInstitute';
import FormSociedadCientifica from './Forms/FormScientificSocieties';
import FormCentroInvestigacion from './Forms/FormResearchCenter';
import FormResearchGroup from './Forms/FormResearchGroup';
const CardPlus = ({ onAgregarEvento, onAgregarNoticia, onAgregarInstitutoInvestigacion, onAgregarSociedadCientifica, onAgregarCentroInvestigacion,onAgregarGrupoInvestigacion,tipoFormulario }) => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <Card style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center' }}>
        <Button variant="link" onClick={handleShowForm}>
          <h1 style={{ fontSize: '2em' }}>+</h1>
        </Button>
      </Card>

      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Formulario de ${tipoFormulario}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tipoFormulario === 'evento' ? (
            <FormEvento onAgregarEvento={onAgregarEvento} onCerrarFormulario={handleClose} />
          )
           : tipoFormulario === 'noticia' ? (
            <FormNoticia onAgregarNoticia={onAgregarNoticia} onCerrarFormulario={handleClose} /> 
           )
           : tipoFormulario === 'InstitutoInvestigacion' ? (
            <FormInstitutoInvestigacion onAgregarInstitutoInvestigacion={onAgregarInstitutoInvestigacion} onCerrarFormulario={handleClose} />
          ) : tipoFormulario === 'SociedadCientifica' ? (
            <FormSociedadCientifica onAgregarSociedadCientifica={onAgregarSociedadCientifica} onCerrarFormulario={handleClose} />
          ) : tipoFormulario === 'CentroInvestigacion' ? (
            <FormCentroInvestigacion onAgregarCentroInvestigacion={onAgregarCentroInvestigacion} onCerrarFormulario={handleClose} />
          ) : (
            <FormResearchGroup onAgregarGrupoInvestigacion={onAgregarGrupoInvestigacion} onCerrarFormulario={handleClose} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardPlus;