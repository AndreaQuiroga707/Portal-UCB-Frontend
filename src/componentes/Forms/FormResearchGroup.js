import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { ServicioGruposInvestigacion } from '../../servicios/ServicioGruposInvestigacion';
import ServicioImagenes from '../../servicios/ServicioImagenes';
import { ServicioCarreras } from '../../servicios/ServicioCarreras';
import { ServicioContacto } from '../../servicios/ServicioContacto';

const FormResearchGroup = ({ onAgregarGrupoInvestigacion, onCerrarFormulario, existingData }) => {
  const [nombre, setNombre] = useState('');
  const [enlaceWeb, setEnlaceWeb] = useState('');
  const [carreraId, setCarreraId] = useState('');
  const [contactoId, setContactoId] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [carreras, setCarreras] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const servicioGruposInvestigacion = new ServicioGruposInvestigacion();
  const servicioImagenes = new ServicioImagenes();
  const servicioCarrera = new ServicioCarreras();
  const servicioContacto = new ServicioContacto();

  // Actualizar el estado del formulario si hay datos existentes
  useEffect(() => {
    async function fetchData() {
      try {
        const carrerasResponse = await servicioCarrera.getAllCarreras();
        const contactosResponse = await servicioContacto.getAll();

        if (Array.isArray(carrerasResponse.data) && Array.isArray(contactosResponse.data)) {
          setCarreras(carrerasResponse.data);
          setContactos(contactosResponse.data);

          if (carrerasResponse.data.length > 0) {
            setCarreraId(existingData ? existingData.carrera.carreraId : carrerasResponse.data[0].carreraId);
          }

          if (contactosResponse.data.length > 0) {
            setContactoId(existingData ? existingData.contacto.contactoId : contactosResponse.data[0].contactoId);
          }

          if (existingData) {
            setNombre(existingData.nombre);
            setEnlaceWeb(existingData.enlaceWeb);
          }
        } else {
          console.error('La respuesta del servidor no contiene un array de datos:', carrerasResponse, contactosResponse);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }

    // Verificar si las carreras y contactos ya se han cargado antes de hacer nuevas llamadas
    if (carreras.length === 0 || contactos.length === 0) {
      fetchData();
    }
  }, [servicioCarrera, servicioContacto, carreras, contactos, existingData]);

  const handleArchivoChange = async (e) => {
    const file = e.target.files[0];
    setArchivo(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let enlaceImagen = existingData ? existingData.enlaceImagen : null;

      if (archivo) {
        enlaceImagen = await servicioImagenes.uploadImagen(archivo);
      }

      setIsLoading(true);

      if (existingData) {
        await servicioGruposInvestigacion.putGrupoInvestigacion({
          ...existingData,
          nombre,
          enlaceWeb,
          carrera: { carreraId },
          contacto: { contactoId },
          enlaceImagen,
        });
      } else {
        await servicioGruposInvestigacion.postGrupoInvestigacion({
          nombre,
          enlaceWeb,
          carrera: { carreraId },
          contacto: { contactoId },
          enlaceImagen,
        });
      }

      setNombre('');
      setEnlaceWeb('');
      setCarreraId('');
      setContactoId('');
      setArchivo(null);
      onCerrarFormulario();
      onAgregarGrupoInvestigacion();
    } catch (error) {
      console.error('Error al procesar el Grupo de Investigación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEnlaceWeb">
        <Form.Label>Enlace Web</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el enlace web"
          value={enlaceWeb}
          onChange={(e) => setEnlaceWeb(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formCarreraId">
        <Form.Label>Carrera</Form.Label>
        <Form.Control as="select" value={carreraId} onChange={(e) => setCarreraId(e.target.value)}>
          {carreras.map((carrera) => (
            <option key={carrera.carreraId} value={carrera.carreraId}>
              {carrera.nombre}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formContactoId">
        <Form.Label>Contacto</Form.Label>
        <Form.Control as="select" value={contactoId} onChange={(e) => setContactoId(e.target.value)}>
          {contactos.map((contacto) => (
            <option key={contacto.contactoId} value={contacto.contactoId}>
              {contacto.nombre}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formArchivo">
        <Form.Label>Imagen</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleArchivoChange} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Spinner animation="border" size="sm" /> Cargando...
          </>
        ) : (
          <>
            {existingData ? 'Actualizar Grupo de Investigación' : 'Agregar Grupo de Investigación'}
          </>
        )}
      </Button>
    </Form>
  );
};

export default FormResearchGroup;
