import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { ServicioEventos } from '../../servicios/ServicioEventos';
import ServicioImagenes from '../../servicios/ServicioImagenes';
import Modal from 'react-bootstrap/Modal';

const FormEvento = ({ onAgregarEvento, onCerrarFormulario, existingData }) => {
  const [evento, setEvento] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: '',
  });

  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const servicioEventos = new ServicioEventos();
  const servicioImagenes = new ServicioImagenes();

  // Actualizar el estado del formulario si hay datos existentes
  useEffect(() => {
    if (existingData) {
      setEvento(existingData);
    }
  }, [existingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
  };

  const handleCreateEvento = async () => {
    const enlaceImagen = await servicioImagenes.uploadImagen(archivo);

    await servicioEventos.postEvento({
      ...evento,
      enlaceImagen,
    });
  };

  const handleUpdateEvento = async () => {
    let enlaceImagen = existingData.enlaceImagen;

    if (archivo) {
      enlaceImagen = await servicioImagenes.uploadImagen(archivo);
    }

    await servicioEventos.putEvento({
      ...evento,
      enlaceImagen,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (existingData) {
        // Si hay datos existentes, realizar la actualización
        await handleUpdateEvento();
      } else {
        // Si no hay datos existentes, realizar la creación
        await handleCreateEvento();
      }

      // Limpiar el formulario y cerrar el modal
      setEvento({
        nombre: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: '',
      });
      setArchivo(null);
      setError(null);

      // Actualizar la lista de eventos solo si es una creación
      if (!existingData) {
        onAgregarEvento();
      }

      // Cerrar el formulario
      onCerrarFormulario();
    } catch (error) {
      console.error('Error al procesar el evento:', error);
      setError('Error al procesar el evento. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="nombre" value={evento.nombre} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Fecha de Inicio:
        <input type="date" name="fechaInicio" value={evento.fechaInicio} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Fecha de Fin:
        <input type="date" name="fechaFin" value={evento.fechaFin} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Descripción:
        <textarea name="descripcion" value={evento.descripcion} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Subir Imagen:
        <input type="file" accept="image/*" onChange={handleArchivoChange} />
      </label>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br />
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
          existingData ? 'Actualizar Evento' : 'Crear Evento'
        )}
      </Button>
    </form>
  );
};

export default FormEvento;
