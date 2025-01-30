import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { ServicioEventos } from "../../servicios/ServicioEventos";
import ServicioImagenes from "../../servicios/ServicioImagenes";

const FormEvento = ({ onAgregarEvento, onActualizarEvento, onCerrarFormulario, existingData }) => {
  console.log("📌 Props recibidos en FormEvento:", { onAgregarEvento, onActualizarEvento, onCerrarFormulario });

 
  const [evento, setEvento] = useState(() => ({
    eventoId: existingData?.eventoId || null, // Se mantiene nulo si es creación
    nombre: existingData?.nombre || "",
    fechaInicio: existingData?.fechaInicio || "",
    fechaFin: existingData?.fechaFin || "",
    descripcion: existingData?.descripcion || "",
  }));
  

  const [archivo, setArchivo] = useState(null);
  const [error] = useState(null);
  const [loading, setLoading] = useState(false);

  const servicioEventos = new ServicioEventos();
  const servicioImagenes = new ServicioImagenes();

  useEffect(() => {
    console.log("📌 existingData recibido en FormEvento:", existingData);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔄 Mostrar el spinner mientras se procesa

    try {
      let enlaceImagen = existingData ? existingData.enlaceImagen : null;

      console.log("📌 onActualizarEvento recibido en FormEvento:", onActualizarEvento);

      if (archivo) {
        enlaceImagen = await servicioImagenes.uploadImagen(archivo);
      }

      if (existingData) {
        // 🔄 Actualizando evento
        const eventoActualizado = {
          eventoId: evento.eventoId, // ✅ Ahora el ID está incluido en la actualización
          nombre: evento.nombre,
          fechaInicio: evento.fechaInicio,
          fechaFin: evento.fechaFin,
          descripcion: evento.descripcion,
          enlaceImagen,
        };

        console.log("🛠️ Enviando actualización:", eventoActualizado);
        await servicioEventos.actualizarEvento(eventoActualizado);
    
        if (typeof onActualizarEvento === "function") {
            await onActualizarEvento(eventoActualizado);
        } else {
            console.warn("⚠️ `onActualizarEvento` no está definido correctamente.");
        }
    
        alert("✅ Evento actualizado con éxito");


      } else {
        // 🆕 Creando un nuevo evento
        const nuevoEvento = {
          nombre: evento.nombre,
          fechaInicio: evento.fechaInicio,
          fechaFin: evento.fechaFin,
          descripcion: evento.descripcion,
          enlaceImagen,
        };

        console.log("📤 Enviando nuevo evento:", nuevoEvento);
        await onAgregarEvento(nuevoEvento);
        alert("✅ Evento creado con éxito");
      }

      // 🔚 Cerrar el formulario si `onCerrarFormulario` está definido
      if (typeof onCerrarFormulario === "function") {
        onCerrarFormulario();
      } else {
        console.warn("⚠️ `onCerrarFormulario` no está definido correctamente.");
        console.log("📌 onCerrarFormulario recibido en FormEvento:", onCerrarFormulario);

        
      }
      

    } catch (error) {
      console.error("❌ Error en handleSubmit:", error);
      alert("❌ Hubo un error al procesar el evento.");
    } finally {
      setLoading(false); // 🔽 Ocultar el spinner después de completar la solicitud
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br />
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> {existingData ? "Actualizando..." : "Creando..."}
          </>
        ) : (
          existingData ? "Actualizar Evento" : "Crear Evento"
        )}
      </Button>
    </form>
  );
};

export default FormEvento;


/*import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { ServicioEventos } from "../../servicios/ServicioEventos";
import ServicioImagenes from "../../servicios/ServicioImagenes";

const FormEvento = ({ onAgregarEvento, onActualizarEvento, onCerrarFormulario, existingData }) => {
  const [evento, setEvento] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: "",
  });

  const [archivo, setArchivo] = useState(null);
  const [error] = useState(null);
  const [loading, setLoading] = useState(false);

  const servicioEventos = new ServicioEventos();
  const servicioImagenes = new ServicioImagenes();

  // Evita el bucle infinito en useEffect
  useEffect(() => {
    if (existingData) {
      setEvento(existingData);
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
  };

  const handleCreateEvento = async () => {
    let enlaceImagen = "";
    if (archivo) {
      enlaceImagen = await servicioImagenes.uploadImagen(archivo);
    }

    const nuevoEvento = { ...evento, enlaceImagen };
    await servicioEventos.crearEvento(nuevoEvento);
  };

  const handleUpdateEvento = async () => {
    try {
      let enlaceImagen = evento.enlaceImagen; // Mantener la imagen actual si no hay nueva
  
      if (archivo) {
        enlaceImagen = await servicioImagenes.uploadImagen(archivo);
      }
  
      const eventoActualizado = {
        eventoId: existingData.eventoId, // Asegurar que se manda el ID
        nombre: evento.nombre,
        fechaInicio: evento.fechaInicio,
        fechaFin: evento.fechaFin,
        descripcion: evento.descripcion,
        enlaceImagen: enlaceImagen,
      };
  
      await servicioEventos.actualizarEvento(eventoActualizado);
    } catch (error) {
      console.error("Error en handleUpdateEvento:", error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔄 Mostrar el spinner mientras se procesa

    try {
      if (existingData) {
        // 🛠️ Actualizando evento
        console.log("🛠️ Actualizando evento:", existingData);

        let enlaceImagen = existingData.enlaceImagen; // Mantener imagen actual si no se sube una nueva

        if (archivo) {
          enlaceImagen = await servicioImagenes.uploadImagen(archivo);
        }

        const eventoActualizado = {
          eventoId: existingData.eventoId, // ✅ Asegurar que se manda el ID correcto
          nombre: evento.nombre,
          fechaInicio: evento.fechaInicio,
          fechaFin: evento.fechaFin,
          descripcion: evento.descripcion,
          enlaceImagen: enlaceImagen,
        };

        await servicioEventos.actualizarEvento(eventoActualizado);
        alert("✅ Evento actualizado con éxito");
      } else {
        // 🆕 Creando un nuevo evento
        const nuevoEvento = {
          nombre: evento.nombre,
          fechaInicio: evento.fechaInicio,
          fechaFin: evento.fechaFin,
          descripcion: evento.descripcion,
          enlaceImagen: archivo ? await servicioImagenes.uploadImagen(archivo) : null,
        };

        console.log("📤 Enviando nuevo evento:", nuevoEvento);
        await onAgregarEvento(nuevoEvento);
        alert("✅ Evento creado con éxito");
      }

      // 🔚 Cerrar el formulario si `onCerrarFormulario` está definido
      if (typeof onCerrarFormulario === "function") {
        onCerrarFormulario();
      } else {
        console.warn("⚠️ `onCerrarFormulario` no está definido correctamente.");
      }
      
    } catch (error) {
      console.error("❌ Error en handleSubmit:", error);
      alert("❌ Hubo un error al procesar el evento.");
    } finally {
      setLoading(false); // 🔽 Ocultar el spinner después de completar la solicitud
    }
  };
*/

  
/*
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar el spinner mientras se procesa
  
    try {
      const nuevoEvento = {
        nombre: evento.nombre,
        fechaInicio: evento.fechaInicio,
        fechaFin: evento.fechaFin,
        descripcion: evento.descripcion,
        enlaceImagen: archivo ? await servicioImagenes.uploadImagen(archivo) : null,
      };
  
      console.log("Enviando evento:", nuevoEvento);
  
      await onAgregarEvento(nuevoEvento);
  
      alert("Evento creado con éxito");
  
      /*setRefresh(prev => !prev);  
      onCerrarFormulario();  // 🔚 Cerrar el formulario
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      alert("Hubo un error al crear el evento.");
    } finally {
      setLoading(false); // Ocultar el spinner después de completar la solicitud
    }
  };
  */
  
/*
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
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            Creando...
          </>
        ) : (
          existingData ? "Actualizar Evento" : "Crear Evento"
        )}
      </Button>

    </form>
  );
};

export default FormEvento;

/*
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
*/