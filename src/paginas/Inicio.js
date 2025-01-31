import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CarouselComponent from '../componentes/CarouselComponent';
import CardComponent from '../componentes/CardComponent';
import CardNews from '../componentes/CardNews';
import FormEvento from '../componentes/Forms/FormEvento';
import FormNoticia from '../componentes/Forms/FormNoticia';
import { ServicioEventos } from '../servicios/ServicioEventos';
import { ServicioNoticias } from '../servicios/ServicioNoticias';
import { ServicioSuscripcion } from '../servicios/ServicioSuscripcion'; // Importa el servicio de suscripción
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { ServicioFacultades } from '../servicios/ServicioFacultades';
import { ServicioCarreras } from '../servicios/ServicioCarreras';
import NavbarComponent from '../componentes/Navbar';
import CardComponent2 from '../componentes/CardComponent2';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from '../componentes/FooterComponent';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Inicio extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      news: [],
      facultad: [],
      carrerasPorFacultad: {},
      showEventoForm: false,
      showNoticiaForm: false,
      showNotificationModal: false,
      showSubscriptionSuccessModal: false,
      showUnsubscribeSuccessModal: false,
      isLoading: false,
      correo: '',
    };
    this.servicioEventos = new ServicioEventos();
    this.servicioNoticias = new ServicioNoticias();
    this.servicioSuscripcion = new ServicioSuscripcion(); // Inicializa el servicio de suscripción
    this.servicioFacultades = new ServicioFacultades();
    this.servicioCarreras = new ServicioCarreras();
  }

  componentDidMount() {
    this.servicioEventos.getAll().then((data) => {
      this.setState({ events: data.data });
    });

    this.servicioNoticias.getAll().then((data) => {
      this.setState({ news: data.data });
    });
    this.servicioFacultades.getAll().then((response) => {
      if(response.status === 200 && Array.isArray(response.data)) {
        this.setState({ facultad: response.data }, () => {
          // Cargar las carreras después de que las facultades se han cargado
          this.state.facultad.forEach(facultad => {
            this.servicioCarreras.getCarrerasPorFacultad(facultad.facultadId)
              .then(carreras => {
                this.setState(prevState => ({
                  carrerasPorFacultad: {
                    ...prevState.carrerasPorFacultad,
                    [facultad.facultadId]: carreras
                  }
                }));
              })
              .catch(error => console.error("Error al cargar carreras para la facultad", facultad.facultadId, error));
          });
        });
      } else {
        console.error("Respuesta no válida del servicio de facultades", response);
      }
    }).catch(error => {
      console.error("Error al cargar facultades", error);
    });
  }

  getColorClass(index) {
    const colors = [
      "facultad-economia",
      "facultad-ingenieria",
      "facultad-sociales",
      "facultad-arquitectura",
      "facultad-derecho",
      "facultad-medicina",
      // ... más colores si son necesarios
    ];
    return colors[index % colors.length]; // Esto ciclará entre los colores si hay más facultades que colores
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

  handleShowNotificationModal = () => {
    this.setState({ showNotificationModal: true });
  };

  handleCloseNotificationModal = () => {
    this.setState({ showNotificationModal: false });
  };

  handleCorreoChange = (e) => {
    this.setState({ correo: e.target.value });
  };

  showSubscriptionSuccessModal = () => {
    this.setState({
      showNotificationModal: false,
      showSubscriptionSuccessModal: true,
    });
  };

  hideSubscriptionSuccessModal = () => {
    this.setState({ showSubscriptionSuccessModal: false });
  };

  showUnsubscribeSuccessModal = () => {
    this.setState({
      showNotificationModal: false,
      showUnsubscribeSuccessModal: true,
    });
  };

  hideUnsubscribeSuccessModal = () => {
    this.setState({ showUnsubscribeSuccessModal: false });
  };

  handleEnviarNotificacion = () => {
    const { correo } = this.state;

    // Llama al servicio para suscribirse
    this.servicioSuscripcion.postSuscripcion(correo)
      .then(response => {
        // Maneja la respuesta según tus necesidades
      })
      .catch(error => {
        // Maneja el error según tus necesidades
        console.error("Error al suscribirse:", error);
      });

    // Luego, cierra el modal y muestra el modal de suscripción exitosa
    this.handleCloseNotificationModal();
    this.showSubscriptionSuccessModal();
  };

  handleDesuscribirse = () => {
    const { correo } = this.state;

    // Llama al servicio para desuscribirse
    this.servicioSuscripcion.deleteSuscripcionByCorreo(correo)
      .then(response => {
        // Maneja la respuesta según tus necesidades
      })
      .catch(error => {
        // Maneja el error según tus necesidades
        console.error("Error al desuscribirse:", error);
      });

    // Luego, cierra el modal y muestra el modal de desuscripción exitosa
    this.handleCloseNotificationModal();
    this.showUnsubscribeSuccessModal();
  };

  render() {
    return (
      <div className="App">
        <div className="contenedor-principal">
          <div className="image-container" style={{ width: '100%', height: '50%' }}>
            <CarouselComponent />
          </div>
          <Container className="descripcion-carousel">
            <Container className="titulos">
              <h2>
                DESCUBRE LA EXPERIENCIA UCB
              </h2>
            </Container>
            <p>
              En la Universidad Católica Boliviana San Pablo La Paz, nos esforzamos por brindar una experiencia educativa excepcional. Nuestro compromiso va más allá de la enseñanza académica; buscamos formar destacados profesionales que sean agentes de cambio con valores humanos e identidad católica.
            </p>
            <p>
              Contamos con una infraestructura de vanguardia equipada con los mejores equipos tecnológicos y comodidades para que los estudiantes desarrollen sus capacidades teórico–prácticas. Además, ofrecemos espacios recreativos, una destacada biblioteca y Wi-Fi gratuito en todo el campus.
            </p>
            <p>
              Nos distinguimos por nuestra calidad académica respaldada por un distinguido plantel docente con capacitación a nivel de maestría y doctorado. Nuestro modelo de educación por competencias incluye mallas curriculares actualizadas para satisfacer las demandas del mercado laboral nacional e internacional.
            </p>
            <p>
              Brindamos amplias oportunidades a través de programas de intercambio con más de 200 universidades en todo el mundo. Además, ofrecemos diversas becas de estudio y programas de empleabilidad para facilitar la rápida inserción laboral de nuestros graduados.
            </p>
            <p>
              Nuestra oferta educativa va más allá de las aulas. Los estudiantes pueden participar en una variedad de actividades, incluyendo cursos, talleres, capacitaciones, centros de idiomas y postgrados. Fomentamos una vida universitaria dinámica con centros de estudiantes, sociedades científicas, talleres culturales, voluntariados y clubes deportivos para fortalecer el crecimiento personal.
            </p>
          </Container>
          <Container className="titulos">
            <h2>
              Próximos eventos
              {/* Botón de campana */}
              <Button variant="outline-primary" onClick={this.handleShowNotificationModal}>
                <FontAwesomeIcon icon={faBell} />
              </Button>
            </h2>
          </Container>

          {this.state.events && this.state.events.map((event) => (
            <div key={event.eventoId} className="card-container">
              <CardComponent
                key={event.eventoId}
                fechaInicio={event.fechaInicio}
                fechaFin={event.fechaFin}
                title={event.nombre}
                description={event.descripcion}
                enlaceImagen={event.enlaceImagen}
              />
            </div>
          ))}

          <Container className="titulos">
            <h2>Noticias</h2>
          </Container>

          {this.state.news && this.state.news.map((news) => (
            <div key={news.noticiaId} className="card-container">
              <CardNews
                key={news.noticiaId}
                fechaPublicacion={news.fechaPublicacion}
                title={news.titulo}
                description={news.contenido}
                enlaceImagen={news.enlaceImagen}
              />
            </div>
          ))}

          {/* Modal de notificaciones */}
          <Modal show={this.state.showNotificationModal} onHide={this.handleCloseNotificationModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Notificaciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="notification-modal-content">
                <p>
                  Suscríbete para recibir notificaciones sobre nuevos eventos y noticias. Te enviaremos información interesante directamente a tu correo electrónico.
                </p>
                <p>
                  Puedes cancelar la suscripción en cualquier momento.
                </p>
                {/* Campo para el correo */}
                <Form.Group controlId="formCorreo">
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su correo"
                    value={this.state.correo}
                    onChange={this.handleCorreoChange}
                  />
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* Botón de enviar */}
              <Button variant="primary" onClick={this.handleEnviarNotificacion} disabled={this.state.isLoading}>
                {this.state.isLoading ? (
                  <span>
                    <i className="fa fa-spinner fa-spin"></i> Enviando...
                  </span>
                ) : (
                  'Suscribirse'
                )}
              </Button>
              {/* Botón de quitar suscripción */}
              <Button variant="secondary" onClick={this.handleDesuscribirse} disabled={this.state.isLoading}>
                {this.state.isLoading ? (
                  <span>
                    <i className="fa fa-spinner fa-spin"></i> Procesando...
                  </span>
                ) : (
                  'Desuscribirse'
                )}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal de suscripción exitosa */}
          <Modal show={this.state.showSubscriptionSuccessModal} onHide={this.hideSubscriptionSuccessModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Suscripción Exitosa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>¡Te has suscrito exitosamente! Recibirás notificaciones sobre nuevos eventos y noticias.</p>
            </Modal.Body>
          </Modal>

          {/* Modal de desuscripción exitosa */}
          <Modal show={this.state.showUnsubscribeSuccessModal} onHide={this.hideUnsubscribeSuccessModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Desuscripción Exitosa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Te has desuscrito exitosamente. Ya no recibirás notificaciones.</p>
            </Modal.Body>
          </Modal>

          {/* Mostrar el formulario correspondiente según el estado */}
          {this.state.showEventoForm && <FormEvento onCloseForm={this.handleCloseForm} />}
          {this.state.showNoticiaForm && <FormNoticia onCloseForm={this.handleCloseForm} />}

          <Container className="titulos">
            <h2>Facultades y Carreras</h2>
            <Row>
              {this.state.facultad.map((facultad, index) => (
                <Col md={3} className="mb-4" key={facultad.facultadId}>
                  <CardComponent2
                    title={facultad.nombre}
                    colorClass={this.getColorClass(index)}
                    carreras={this.state.carrerasPorFacultad[facultad.facultadId]}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Inicio;
