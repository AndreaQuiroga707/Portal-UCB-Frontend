import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { PencilSquare } from "react-bootstrap-icons";
import FormNoticia from "./Forms/FormNoticia";
import FormEvento from "./Forms/FormEvento";
import FormResearchInstitute from "./Forms/FormResearchInstitute";
import FormResearchCenter from "./Forms/FormResearchCenter";
import FormScientificSocieties from "./Forms/FormScientificSocieties";
import FormResearchGroup from "./Forms/FormResearchGroup";

const CardUpdate = ({ onUpdate, tipoFormulario, existingData }) => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <Card style={{ background: "rgba(255, 255, 255, 0.8)", padding: "20px", textAlign: "center" }}>
        <Button variant="link" onClick={handleShowForm}>
          <PencilSquare style={{ fontSize: "2em" }} />
        </Button>
      </Card>

      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Formulario de ${tipoFormulario}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tipoFormulario === "evento" && (
            <FormEvento onSubmit={onUpdate} onClose={handleClose} existingData={existingData} />
          )}
          {tipoFormulario === "noticia" && (
            <FormNoticia onSubmit={onUpdate} onClose={handleClose} existingData={existingData} />
          )}
          {tipoFormulario === "InstitutoInvestigacion" && (
            <FormResearchInstitute onSubmit={onUpdate} onClose={handleClose} existingData={existingData} />
          )}
          {tipoFormulario === "CentroInvestigacion" && (
            <FormResearchCenter onSubmit={onUpdate} onClose={handleClose} existingData={existingData} />
          )}
          {tipoFormulario === "SociedadCientifica" && (
            <FormScientificSocieties onSubmit={onUpdate} onClose={handleClose} existingData={existingData} />
          )}
          {tipoFormulario === "GrupoInvestigacion" && (
            <FormResearchGroup onSubmit={onUpdate} onClose={handleClose} existingData={existingData} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardUpdate;

/*import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PencilSquare } from 'react-bootstrap-icons';
import FormNoticia from './Forms/FormNoticia';
import FormEvento from './Forms/FormEvento';
import FormResearchInstitute from './Forms/FormResearchInstitute';
import FormResearchCenter from './Forms/FormResearchCenter';
import FormScientificSocieties from './Forms/FormScientificSocieties';
import FormResearchGroup from './Forms/FormResearchGroup';

const CardUpdate = ({ onUpdate, tipoFormulario, existingData }) => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleUpdate = () => {
    handleShowForm();
  };

  return (
    <>
      <Card style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center' }}>
        <Button variant="link" onClick={handleUpdate}>
          <PencilSquare style={{ fontSize: '2em' }} />
        </Button>
      </Card>

      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Formulario de ${tipoFormulario}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          {tipoFormulario === 'noticia' && (
            <FormNoticia onAgregarNoticia={onUpdate} onCerrarFormulario={handleClose} existingData={existingData} />
          )}
          {tipoFormulario === 'evento' && (
            <FormEvento onAgregarEvento={onUpdate} onCerrarFormulario={handleClose} existingData={existingData} />
          )}
          {tipoFormulario === 'InstitutoInvestigacion' && (
            <FormResearchInstitute
              onAgregarCentroInvestigacion={onUpdate}
              onCerrarFormulario={handleClose}
              existingData={existingData}
            />
          )}
          {tipoFormulario === 'CentroInvestigacion' && (
            <FormResearchCenter
              onAgregarCentroInvestigacion={onUpdate}
              onCerrarFormulario={handleClose}
              existingData={existingData}
            />
          )}
          {tipoFormulario === 'SociedadCientifica' && (
            <FormScientificSocieties
              onAgregarSociedadCientifica={onUpdate}
              onCerrarFormulario={handleClose}
              existingData={existingData}
            />
          )}
          {tipoFormulario === 'GrupoInvestigacion' && (
            <FormResearchGroup
              onAgregarGrupoInvestigacion={onUpdate}
              onCerrarFormulario={handleClose}
              existingData={existingData}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardUpdate;
*/