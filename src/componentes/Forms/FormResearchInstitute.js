  import React, { useState, useEffect } from 'react';
  import Form from 'react-bootstrap/Form';
  import Button from 'react-bootstrap/Button';
  import Spinner from 'react-bootstrap/Spinner';
  import { ServicioInstitutosInvestigacion } from '../../servicios/ServicioInstitutosInvestigacion';
  import ServicioImagenes from '../../servicios/ServicioImagenes';
  import { ServicioCarreras } from '../../servicios/ServicioCarreras';
  import { ServicioContacto } from '../../servicios/ServicioContacto';

  const FormResearchInstitute = ({
    onAgregarInstitutoInvestigacion, 
    onCerrarFormulario, 
    setRefresh, 
    existingData 
  }) => {
    const [nombre, setNombre] = useState('');
    const [enlaceWeb, setEnlaceWeb] = useState('');
    const [lineasInvestigacion, setLineasInvestigacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [carreraId, setCarreraId] = useState('');
    const [contactoId, setContactoId] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [carreras, setCarreras] = useState([]);
    const [contactos, setContactos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const servicioInstitutosInvestigacion = new ServicioInstitutosInvestigacion();
    const servicioImagenes = new ServicioImagenes();
    const servicioCarrera = new ServicioCarreras();
    const servicioContacto = new ServicioContacto();

    useEffect(() => {
      if (existingData) {
        setNombre(existingData.nombre);
        setEnlaceWeb(existingData.enlaceWeb);
        setLineasInvestigacion(existingData.lineasInvestigacion);
        setDescripcion(existingData.descripcion);
        setCarreraId(existingData.carrera?.carreraId || '');
        setContactoId(existingData.contacto?.contactoId || '');
      }
    }, [existingData]);

    useEffect(() => {
      async function fetchData() {
        try {
          const carrerasResponse = await servicioCarrera.getAllCarreras();
          const contactosResponse = await servicioContacto.getAll();

          if (Array.isArray(carrerasResponse.data) && Array.isArray(contactosResponse.data)) {
            setCarreras(carrerasResponse.data);
            setContactos(contactosResponse.data);

            if (carrerasResponse.data.length > 0 && !existingData) {
              setCarreraId(carrerasResponse.data[0].carreraId);
            }

            if (contactosResponse.data.length > 0 && !existingData) {
              setContactoId(contactosResponse.data[0].contactoId);
            }
          } else {
            console.error('❌ La respuesta del servidor no contiene un array de datos:', carrerasResponse, contactosResponse);
          }
        } catch (error) {
          console.error('❌ Error al obtener datos:', error);
        }
      }

      if (carreras.length === 0 || contactos.length === 0) {
        fetchData();
      }
    }, [existingData]);

    const handleArchivoChange = (e) => {
      setArchivo(e.target.files[0]);
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
          await servicioInstitutosInvestigacion.putInstitutoInvestigacion({
            ...existingData,
            nombre,
            enlaceWeb,
            lineasInvestigacion,
            descripcion,
            carrera: { carreraId },
            contacto: { contactoId },
            enlaceImagen,
          });
        } else {
          await servicioInstitutosInvestigacion.postInstitutoInvestigacion({
            nombre,
            enlaceWeb,
            lineasInvestigacion,
            descripcion,
            carrera: { carreraId },
            contacto: { contactoId },
            enlaceImagen,
          });
        }
    
        // 🔄 Asegurar que `setRefresh` se ejecuta si está definido
        if (typeof setRefresh === "function") {
          setRefresh(prev => !prev);
        } else {
          console.warn("⚠️ `setRefresh` no está definido correctamente.");
        }
    
        // 🛑 Verificar que `onCerrarFormulario` exista antes de llamarlo
        if (typeof onCerrarFormulario === "function") {
          onCerrarFormulario();
        } else {
          console.warn("⚠️ `onCerrarFormulario` no está definido correctamente.");
        }
    
        // 🔄 Asegurar que `onAgregarInstitutoInvestigacion` se ejecuta si está definido
        if (typeof onAgregarInstitutoInvestigacion === "function") {
          onAgregarInstitutoInvestigacion();
        } else {
          console.warn("⚠️ `onAgregarInstitutoInvestigacion` no está definido correctamente.");
        }
    
      } catch (error) {
        console.error("❌ Error al procesar el Instituto de Investigación:", error);
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
            required
          />
        </Form.Group>

        <Form.Group controlId="formEnlaceWeb">
          <Form.Label>Enlace Web</Form.Label>
          <Form.Control
            type="url"
            placeholder="Ingrese el enlace web"
            value={enlaceWeb}
            onChange={(e) => setEnlaceWeb(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLineasInvestigacion">
          <Form.Label>Líneas de Investigación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese las líneas de investigación (separadas por ;) "
            value={lineasInvestigacion}
            onChange={(e) => setLineasInvestigacion(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
            existingData ? 'Actualizar Instituto de Investigación' : 'Agregar Instituto de Investigación'
          )}
        </Button>
      </Form>
    );
  };

  export default FormResearchInstitute;
