import React, { Component } from 'react';
import { ServicioEventos } from '../servicios/ServicioEventos';
import { ServicioNoticias } from '../servicios/ServicioNoticias';
import { ServicioFacultades } from '../servicios/ServicioFacultades';
import { ServicioCarreras } from '../servicios/ServicioCarreras';
import NavbarComponent from '../componentes/Navbar';
import Container from 'react-bootstrap/Container';
import CarouselComponent from '../componentes/CarouselComponent';
import CardComponent from '../componentes/CardComponent';
import CardComponent2 from '../componentes/CardComponent2';
import CardNews from '../componentes/CardNews';
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
    };
    this.servicioEventos = new ServicioEventos();
    this.servicioNoticias = new ServicioNoticias();
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

  render() {
    return (
      <div className="App">
        <NavbarComponent className="navbar" />
        <div className="contenedor-principal">

        <div className="image-container" style={{ width: '100%', height: '50%'}}>
            <CarouselComponent />
          </div>

          <Container className="titulos">
            <h2>Próximos eventos</h2>
          </Container>

          {this.state.events && this.state.events.map((event) => (
            <div key={event.eventoId} className="card-container">
              <CardComponent
                key={event.eventoId}
                title={event.nombre}
                description={event.descripcion}
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
                title={news.titulo}
                description={news.contenido}
              />
            </div>
          ))}

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
          
          <FooterComponent /> {/* Esto agregará el footer al final de la página */}
        </div>
      </div>
      
      
    );
  }
}

export default Inicio;