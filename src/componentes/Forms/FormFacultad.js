import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { ServicioFacultades } from '../../servicios/ServicioFacultades';

const FormFacultad = ({ onAgregarFacultad, existingData, onCerrarFormulario }) => {
  const [nombre, setNombre] = useState(existingData ? existingData.nombre : '');
  const [descripcion, setDescripcion] = useState(existingData ? existingData.descripcion : '');
  const [loading, setLoading] = useState(false);

  const servicioFacultades = new ServicioFacultades();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const facultadData = {
      nombre,
      descripcion,
    };

    try {
      if (existingData) {
        await servicioFacultades.putFacultad(existingData.id, facultadData);
      } else {
        await servicioFacultades.postFacultad(facultadData);
      }

      if (onAgregarFacultad) {
        onAgregarFacultad();
      }

      if (onCerrarFormulario) {
        onCerrarFormulario();
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre de la facultad"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescripcion">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Ingrese la descripción de la facultad"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-1"
            />
            Cargando...
          </>
        ) : (
          'Guardar'
        )}
      </Button>
    </Form>
  );
};

export default FormFacultad;