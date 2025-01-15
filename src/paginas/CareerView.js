import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import NavbarComponent from '../componentes/Navbar';
import { ServicioCarreras } from '../servicios/ServicioCarreras';
import './CareerView.css'; // Tus estilos personalizados

function CareerView() {
  const { careerId } = useParams();
  const [careerData, setCareerData] = useState(null);
  const servicioCarreras = new ServicioCarreras();

  useEffect(() => {
    if (careerId) {
      servicioCarreras.getCarreraPorId(careerId)
        .then(response => {
          if (response.status === 200 && response.data) {
            setCareerData(response.data); // Asegúrate de usar solo la parte 'data' de la respuesta
          } else {
            // Manejar casos donde no se encuentran datos
            console.error("Carrera no encontrada o respuesta inválida", response);
          }
        })
        .catch(error => {
          console.error("Error al recuperar los datos de la carrera", error);
        });
    }
  }, [careerId]);

  if (!careerData) {
    return <div>Cargando datos de la carrera...</div>;
  }

  const {
    nombre = '', // Proporciona un valor por defecto para evitar errores
    duracionSemestres,
    areasEstudio,
    modalidadesGraduacion,
    beneficios,
    videoPromocional,
    dondeTrabajar,
    mallaCurricularPdf,
    docentesTiempoHorario,
    contacto,
  } = careerData;

  const areasEstudioList = areasEstudio.split(';');
  const modalidadesList = modalidadesGraduacion.split(';');
  const videoId = new URLSearchParams(new URL(videoPromocional).search).get("v");

  const beneficiosList = beneficios.split(';').map((beneficio, index) => (
    <li key={index}>{beneficio}</li>
  ));
  const dondeTrabajarList = dondeTrabajar.split(';').map((lugar, index) => (
    <li key={index}>{lugar}</li>
  ));
  return (
    <div className="App">
      <Container className="career-view my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <Image src={careerData.imageUrl} alt={`Estudiantes de ${nombre}`} className="img-fluid mb-3" />
            <h2 className="mb-3">{nombre.toUpperCase()}</h2>
          </Col>
          {/* ... restante código */}
        </Row>
        <Row>
          <Col md={4}>
            <Card className="info-card mb-3">
              <Card.Body>
                <Card.Title>Duración de la Carrera</Card.Title>
                <Card.Text>{duracionSemestres} Semestres</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="info-card mb-3">
              <Card.Body>
                <Card.Title>Áreas de Estudio</Card.Title>
                <ul>
                  {areasEstudioList.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="info-card mb-3">
              <Card.Body>
                <Card.Title>Modalidades de Graduación</Card.Title>
                <ul>
                  {modalidadesList.map((modalidad, index) => (
                    <li key={index}>{modalidad}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="info-card mb-3">
              <Card.Body>
                <Card.Title>Beneficios</Card.Title>
                <ul>
                  {beneficiosList}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="video-card mb-3">
              <Card.Body>
                <Card.Title>Video Promocional</Card.Title>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allowfullscreen></iframe>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card className="info-card mb-3">
              <Card.Body>
                <Card.Title>Donde Trabajar</Card.Title>
                <ul>
                  {dondeTrabajarList}
                </ul>
              </Card.Body>
            </Card>
          </Col>
      </Row>
      
      <Row className="button-container">
        <Col md={6}>
          <Button href={mallaCurricularPdf} target="_blank" className="mb-3" block style={{ color: '#0056b3', borderColor: '#0056b3', backgroundColor: '#fff' }}>
            Malla Curricular
          </Button>
        </Col>
        <Col md={6}>
          <Button href={docentesTiempoHorario} target="_blank" className="button" block style={{ color: '#0056b3', borderColor: '#0056b3', backgroundColor: '#fff' }}>
            Horario de Docentes
          </Button>
        </Col>
      </Row>

        <Row>
          <Col md={12}>
            <Card className="info-card mb-3">
              <Card.Body>
                <Card.Title>Contacto</Card.Title>
                <ul>
                  <li>Nombre: {contacto.nombre}</li>
                  <li>Correo: {contacto.correo}</li>
                  <li>Teléfono: {contacto.telefono}</li>
                  <li>Móvil: {contacto.movil}</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CareerView;
