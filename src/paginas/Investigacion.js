import React, { Component } from 'react';
import { ServicioInstitutosInvestigacion } from '../servicios/ServicioInstitutosInvestigacion';
import { ServicioSociedadesCientificas } from '../servicios/ServicioSociedadesCientificas';
import { ServicioCentrosInvestigacion } from '../servicios/ServicioCentrosInvestigacion';
import { ServicioGruposInvestigacion } from '../servicios/ServicioGruposInvestigacion';
import NavbarComponent from '../componentes/Navbar';
import Container from 'react-bootstrap/Container';
import CardResearchInstitute from '../componentes/CardResearchInstitute';
import CardScientificSocieties from '../componentes/CardScientificSocieties';
import CardResearchCenters from '../componentes/CardResearchCenters';
import CardResearchGroup from '../componentes/CardResearchGroup';

class InvestigacionAdmin extends Component {
  constructor() {
    super();
    this.state = {
      researchItems: [], 
      cientistSocieties: [],
      researchCenters: [],
      researchGroups: [],
    };
    this.servicioInstitutosInvestigacion = new ServicioInstitutosInvestigacion();
    this.servicioSociedadesCientificas = new ServicioSociedadesCientificas();
    this.servicioCentrosInvestigacion = new ServicioCentrosInvestigacion();
    this.servicioGruposInvestigacion = new ServicioGruposInvestigacion();
  }

  componentDidMount() {
    this.servicioInstitutosInvestigacion.getAll().then((data) => {
      this.setState({ researchItems: data.data });
    });

    this.servicioSociedadesCientificas.getAll().then((data) => {
      this.setState({ cientistSocieties: data.data });
    });

    this.servicioCentrosInvestigacion.getAll().then((data) => {
      this.setState({ researchCenters: data.data });
    });

    this.servicioGruposInvestigacion.getAll().then((data) => {
      this.setState({ researchGroups: data.data });
    });
  }

  render() {
    return (
      <div className="App">
        {/* <NavbarComponent className="navbar" /> */}
        <div className="contenedor-principal">

          <Container className="titulos">
            <h2>Institutos de Investigacion</h2>
          </Container>
          
          {this.state.researchItems && this.state.researchItems.map((item) => (
            <div key={item.institutoId} className="card-container">
              <CardResearchInstitute
                nombre={item.nombre}
                enlaceWeb={item.enlaceWeb}
                descripcion={item.descripcion}
                lineasInvestigacion={item.lineasInvestigacion}
                carrera={item.carrera}
                contacto={item.contacto}
                enlaceImagen={item.enlaceImagen}
              />
            </div>
          ))}
          

          <Container className="titulos">
            <h2>Centros de investigacion</h2>
          </Container>
          {this.state.researchCenters && this.state.researchCenters.map((item) => (
            <div key={item.idCentroInvestigacion} className="card-container">
              <CardResearchCenters
                nombre={item.nombre}
                enlaceWeb={item.enlaceWeb}
                descripcion={item.descripcion}
                lineasInvestigacion={item.lineasInvestigacion}
                carrera={item.carrera}
                contacto={item.contacto}
                enlaceImagen={item.enlaceImagen}
              />
            </div>
          ))}


          <Container className="titulos">
            <h2>Sociedades Científicas</h2> 
          </Container>
          {this.state.cientistSocieties && this.state.cientistSocieties.map((item) => (
            <div key={item.sociedadId} className="card-container">
              <CardScientificSocieties
                nombre={item.nombre}
                enlaceWeb={item.enlaceWeb}
                contacto={item.contacto}
                enlaceImagen={item.enlaceImagen}
              />
            </div>
          ))}
          
            
          <Container className="titulos">
            <h2>Grupos de Investigacion</h2> 
          </Container>
          {this.state.researchGroups && this.state.researchGroups.map((item) => (
            <div key={item.grupoInvestigacionId} className="card-container">
              <CardResearchGroup
                nombre={item.nombre}
                enlaceWeb={item.enlaceWeb}
                carrera={item.carrera}
                contacto={item.contacto}
                enlaceImagen={item.enlaceImagen}
              />
            </div>
          ))}

        </div>
      </div>
    );
  }
}

export default InvestigacionAdmin;
