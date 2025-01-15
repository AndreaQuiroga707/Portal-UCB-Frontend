import React, { useState, useEffect } from 'react';
import { ServicioNoticias } from '../../servicios/ServicioNoticias';
import ServicioImagenes from '../../servicios/ServicioImagenes';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';  // Importa el componente Spinner de Bootstrap

const FormNoticia = ({ onUpdate, onCerrarFormulario, existingData, tipoFormulario }) => {
  const [noticia, setNoticia] = useState({
    titulo: '',
    contenido: '',
    fechaPublicacion: '',
  });

  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Nuevo estado para el spinner
  const servicioNoticias = new ServicioNoticias();
  const servicioImagenes = new ServicioImagenes();

  useEffect(() => {
    if (existingData) {
      setNoticia(existingData);
    }
  }, [existingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoticia({ ...noticia, [name]: value });
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
  };

  const handleCreateNoticia = async () => {
    setLoading(true);  // Activar el spinner
    const enlaceImagen = await servicioImagenes.uploadImagen(archivo);
    await servicioNoticias.postNoticia({
      ...noticia,
      enlaceImagen,
    });
  };

  const handleUpdateNoticia = async () => {
    setLoading(true);  // Activar el spinner
    let enlaceImagen = existingData.enlaceImagen;
    if (archivo) {
      enlaceImagen = await servicioImagenes.uploadImagen(archivo);
    }
    await servicioNoticias.putNoticia({
      ...noticia,
      enlaceImagen,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingData) {
        await handleUpdateNoticia();
      } else {
        await handleCreateNoticia();
      }
      setNoticia({
        titulo: '',
        contenido: '',
        fechaPublicacion: '',
      });
      setArchivo(null);
      setError(null);
      // if (!existingData) {
      //   onUpdate();
      // }
      onCerrarFormulario();
    } catch (error) {
      console.error('Error al procesar la noticia:', error);
      setError('Error al procesar la noticia. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);  // Desactivar el spinner independientemente del resultado
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" name="titulo" value={noticia.titulo} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Contenido:
        <textarea name="contenido" value={noticia.contenido} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Fecha de Publicación:
        <input type="date" name="fechaPublicacion" value={noticia.fechaPublicacion} onChange={handleInputChange} required />
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
          tipoFormulario === 'noticia' ? 'Actualizar Noticia' : 'Crear Noticia'
        )}
      </Button>
    </form>
  );
};

export default FormNoticia;
