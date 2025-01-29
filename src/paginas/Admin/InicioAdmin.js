import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { verificarRol } from "../../utils/authUtils";
import { ServicioEventos } from "../../servicios/ServicioEventos";
import { ServicioNoticias } from "../../servicios/ServicioNoticias";
import Container from "react-bootstrap/Container";
import CarouselComponent from "../../componentes/CarouselComponent";
import CardComponent from "../../componentes/CardComponent";
import CardNews from "../../componentes/CardNews";
import CardPlus from "../../componentes/CardPlus";
import FormEvento from "../../componentes/Forms/FormEvento";
import FormNoticia from "../../componentes/Forms/FormNoticia";
import { LogoutButton } from "../../componentes/Logout";
import CardUpdate from "../../componentes/CardUpdate";
import { Trash } from "react-bootstrap-icons";

const InicioAdmin = () => {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [showEventoForm, setShowEventoForm] = useState(false);
  const [showNoticiaForm, setShowNoticiaForm] = useState(false);
  const [tienePermiso, setTienePermiso] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [refresh, setRefresh] = useState(false); // Nuevo estado para actualizar los datos
  const navigate = useNavigate();

  const servicioEventos = useMemo(() => new ServicioEventos(), []);
  const servicioNoticias = useMemo(() => new ServicioNoticias(), []);

useEffect(() => {
  if (!verificarRol("ADMIN")) {
    setTienePermiso(false);
    setMensaje("No tienes permisos para acceder a esta página.");
    setTimeout(() => navigate("/login"), 3000);
    return;
  }

  const fetchData = async () => {
    try {
      const eventosData = await servicioEventos.getAll();
      setEvents(eventosData.data);
      const noticiasData = await servicioNoticias.getAll();
      setNews(noticiasData.data);
    } catch (error) {
      setMensaje("Error al cargar los datos. Inténtalo nuevamente.");
    }
  };

  fetchData();
}, [navigate, refresh]); 
  if (!tienePermiso) {
    return (
      <div className="no-access-container">
        <h1>{mensaje}</h1>
        <p>Redirigiendo al login...</p>
      </div>
    );
  }

  const handleCloseForm = () => {
    setShowEventoForm(false);
    setShowNoticiaForm(false);
  };

  const handleAddEvento = async (nuevoEvento) => {
    try {
      await servicioEventos.crearEvento(nuevoEvento);
      setRefresh(prev => !prev); // Forzar actualización de la lista
    } catch (error) {
      console.error("Error al crear el evento:", error);
      alert("Hubo un error al crear el evento.");
    }
  };
  

  const handleUpdateEvento = async (eventoActualizado) => {
    try {
      await servicioEventos.actualizarEvento(eventoActualizado);
      alert("Evento actualizado con éxito");
      setRefresh(prev => !prev); // Forzar actualización
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      alert("Hubo un error al actualizar el evento");
    }
  };

  const handleDeleteEvento = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        await servicioEventos.eliminarEvento(id);
        alert("Evento eliminado con éxito");
        setRefresh(prev => !prev); // Forzar actualización
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
        alert("Hubo un error al eliminar el evento");
      }
    }
  };

  const handleDeleteNoticia = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta noticia?")) {
      try {
        await servicioNoticias.deleteNoticia(id);
        alert("Noticia eliminada con éxito");
        setRefresh(prev => !prev); // Forzar actualización
      } catch (error) {
        console.error("Error al eliminar la noticia:", error);
        alert("Hubo un error al eliminar la noticia");
      }
    }
  };

  return (
    <div className="App">
      <div className="contenedor-principal">
        <div className="image-container" style={{ width: "100%", height: "50%" }}>
          <CarouselComponent />
        </div>

        <Container className="titulos">
          <h2>Próximos eventos</h2>
        </Container>

        {events &&
          events.map((event) => (
            <div key={event.eventoId} className="card-container">
              <CardComponent
                title={event.nombre}
                fechaInicio={event.fechaInicio}
                fechaFin={event.fechaFin}
                description={event.descripcion}
                enlaceImagen={event.enlaceImagen}
              />
              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <CardUpdate
                  tipoFormulario="evento"
                  onUpdate={handleUpdateEvento}
                  existingData={event}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteEvento(event.eventoId)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1px",
                    fontSize: "1.8em",
                    width: "100px",
                    height: "98px",
                  }}
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}

        <CardPlus 
          onAgregarEvento={handleAddEvento} 
          tipoFormulario="evento" 
        />


        <Container className="titulos">
          <h2>Noticias</h2>
        </Container>

        {news &&
          news.map((news) => (
            <div key={news.noticiaId} className="card-container">
              <CardNews
                fechaPublicacion={news.fechaPublicacion}
                title={news.titulo}
                description={news.contenido}
                enlaceImagen={news.enlaceImagen}
              />
              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <CardUpdate
                  tipoFormulario="noticia"
                  onUpdate={handleUpdateEvento}
                  existingData={news}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteNoticia(news.noticiaId)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1px",
                    fontSize: "1.8em",
                    width: "100px",
                    height: "98px",
                  }}
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}

        <CardPlus onAgregarEvento={handleAddEvento} tipoFormulario="evento" setRefresh={setRefresh} />

        {showEventoForm && (
          <FormEvento 
            onAgregarEvento={(evento) => handleAddEvento(evento)}  
            onCerrarFormulario={() => setShowEventoForm(false)} 
            setRefresh={setRefresh} 
          />
        )}

        {showNoticiaForm && <FormNoticia onCloseForm={handleCloseForm} />}
        <LogoutButton />
      </div>
    </div>
  );
};

export default InicioAdmin;


/*
import React, { Component } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { ServicioEventos } from '../../servicios/ServicioEventos';
import { ServicioNoticias } from '../../servicios/ServicioNoticias';
import Container from 'react-bootstrap/Container';
import CarouselComponent from '../../componentes/CarouselComponent';
import CardComponent from '../../componentes/CardComponent';
import CardNews from '../../componentes/CardNews';
import CardPlus from '../../componentes/CardPlus';
import FormEvento from '../../componentes/Forms/FormEvento';
import FormNoticia from '../../componentes/Forms/FormNoticia';
import { LogoutButton } from '../../componentes/Logout';
import CardUpdate from '../../componentes/CardUpdate';
import { Trash } from 'react-bootstrap-icons';

class InicioAdmin extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      news: [],
      facultad: [],
      carrerasPorFacultad: {},
      showEventoForm: false,
      showNoticiaForm: false,
    };
    this.servicioEventos = new ServicioEventos();
    this.servicioNoticias = new ServicioNoticias();
  }

  componentDidMount() {
    this.servicioEventos.getAll().then((data) => {
      this.setState({ events: data.data });
    });

    this.servicioNoticias.getAll().then((data) => {
      this.setState({ news: data.data });
    });
  }

  handleShowEventoForm = () => {
    this.setState({ showEventoForm: true, showNoticiaForm: false });
  };

  handleShowNoticiaForm = () => {
    this.setState({ showNoticiaForm: true, showEventoForm: false });
  };

  handleCloseForm = () => {
    this.setState({ showEventoForm: false, showNoticiaForm: false });
  };

  handleDeleteEvento = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        await this.servicioEventos.deleteEvento(id);
        alert("Evento eliminado con éxito");
        const updatedEvents = await this.servicioEventos.getAll();
        this.setState({ events: updatedEvents.data });
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
        alert("Hubo un error al eliminar el evento");
      }
    }
  };

  handleDeleteNoticia = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta noticia?")) {
      try {
        await this.servicioNoticias.deleteNoticia(id);
        alert("Noticia eliminada con éxito");
        const updatedNews = await this.servicioNoticias.getAll();
        this.setState({ news: updatedNews.data });
      } catch (error) {
        console.error("Error al eliminar la noticia:", error);
        alert("Hubo un error al eliminar la noticia");
      }
    }
  };

  render() {
    return (
      <div className="App">
        <div className="contenedor-principal">
          <div className="image-container" style={{ width: '100%', height: '50%' }}>
            <CarouselComponent />
          </div>

          <Container className="titulos">
            <h2>Próximos eventos</h2>
          </Container>

          {this.state.events &&
            this.state.events.map((event) => (
              <div key={event.eventoId} className="card-container">
                <CardComponent
                  key={event.eventoId}
                  title={event.nombre}
                  fechaInicio={event.fechaInicio}
                  fechaFin={event.fechaFin}
                  description={event.descripcion}
                  enlaceImagen={event.enlaceImagen}
                />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <CardUpdate
                    tipoFormulario="evento"
                    onUpdate={() => this.servicioEventos.getAll()}
                    existingData={event}
                  />
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDeleteEvento(event.eventoId)}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '1px',
                      fontSize: '1.8em', // Tamaño del ícono
                      width: '100px',
                      height: '98px', // Botón cuadrado
                    }}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}

          <CardPlus onAgregarEvento={() => this.servicioEventos.getAll()} tipoFormulario="evento" />

          <Container className="titulos">
            <h2>Noticias</h2>
          </Container>

          {this.state.news &&
            this.state.news.map((news) => (
              <div key={news.noticiaId} className="card-container">
                <CardNews
                  key={news.noticiaId}
                  fechaPublicacion={news.fechaPublicacion}
                  title={news.titulo}
                  description={news.contenido}
                  enlaceImagen={news.enlaceImagen}
                />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <CardUpdate
                    tipoFormulario="noticia"
                    onUpdate={() => this.servicioNoticias.getAll()}
                    existingData={news}
                  />
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDeleteNoticia(news.noticiaId)}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '1px',
                      fontSize: '1.8em', // Tamaño del ícono
                      width: '100px',
                      height: '98px', // Botón cuadrado
                    }}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}

          <CardPlus onAgregarNoticia={() => this.servicioNoticias.getAll()} tipoFormulario="noticia" />

          {this.state.showEventoForm && <FormEvento onCloseForm={this.handleCloseForm} />}
          {this.state.showNoticiaForm && <FormNoticia onCloseForm={this.handleCloseForm} />}
          <LogoutButton />
        </div>
      </div>
    );
  }
}

export default withAuthenticationRequired(InicioAdmin);

*/