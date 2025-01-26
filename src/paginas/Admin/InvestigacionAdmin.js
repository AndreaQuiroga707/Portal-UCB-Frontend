// InvestigacionAdmin.js

import React, { Component } from 'react';
import { ServicioInstitutosInvestigacion } from '../../servicios/ServicioInstitutosInvestigacion';
import { ServicioSociedadesCientificas } from '../../servicios/ServicioSociedadesCientificas';
import { ServicioCentrosInvestigacion } from '../../servicios/ServicioCentrosInvestigacion';
import { ServicioGruposInvestigacion } from '../../servicios/ServicioGruposInvestigacion';
import Container from 'react-bootstrap/Container';
import CardResearchInstitute from '../../componentes/CardResearchInstitute';
import CardScientificSocieties from '../../componentes/CardScientificSocieties';
import CardUpdate from '../../componentes/CardUpdate';
import CardPlus from '../../componentes/CardPlus';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { LogoutButton } from '../../componentes/Logout';
import CardResearchCenters from '../../componentes/CardResearchCenters';
import CardResearchGroup from '../../componentes/CardResearchGroup';
import '../../../src/InvestigacionAdmin.css'; // Importa el archivo de estilos CSS
import { Trash } from 'react-bootstrap-icons';

class InvestigacionAdmin extends Component {
  constructor() {
    super();
    this.state = {
      researchItems: [],
      cientistSocieties: [],
      researchCenters: [],
      researchGroups: [],
      dataLoaded: false,
    };
    this.servicioInstitutosInvestigacion = new ServicioInstitutosInvestigacion();
    this.servicioSociedadesCientificas = new ServicioSociedadesCientificas();
    this.servicioCentrosInvestigacion = new ServicioCentrosInvestigacion();
    this.servicioGruposInvestigacion = new ServicioGruposInvestigacion();
  }

  componentDidMount() {
    if (!this.state.dataLoaded) {
      this.fetchData();
    }
  }

  fetchData() {
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

    this.setState({ dataLoaded: true });
  }

  // Métodos para eliminar
  handleDeleteInstituto = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este instituto de investigación?")) {
      try {
        await this.servicioInstitutosInvestigacion.deleteInstitutoInvestigacion(id);
        alert("Instituto eliminado con éxito");
        const updatedInstitutos = await this.servicioInstitutosInvestigacion.getAll();
        this.setState({ researchItems: updatedInstitutos.data });
      } catch (error) {
        console.error("Error al eliminar el instituto:", error);
        alert("Hubo un error al eliminar el instituto");
      }
    }
  };

  handleDeleteCentro = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este centro de investigación?")) {
      try {
        await this.servicioCentrosInvestigacion.deleteCentroInvestigacion(id);
        alert("Centro eliminado con éxito");
        const updatedCentros = await this.servicioCentrosInvestigacion.getAll();
        this.setState({ researchCenters: updatedCentros.data });
      } catch (error) {
        console.error("Error al eliminar el centro:", error);
        alert("Hubo un error al eliminar el centro");
      }
    }
  };

  handleDeleteSociedad = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta sociedad científica?")) {
      try {
        await this.servicioSociedadesCientificas.deleteSociedadCientifica(id);
        alert("Sociedad eliminada con éxito");
        const updatedSociedades = await this.servicioSociedadesCientificas.getAll();
        this.setState({ cientistSocieties: updatedSociedades.data });
      } catch (error) {
        console.error("Error al eliminar la sociedad:", error);
        alert("Hubo un error al eliminar la sociedad");
      }
    }
  };

  handleDeleteGrupo = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este grupo de investigación?")) {
      try {
        await this.servicioGruposInvestigacion.deleteGrupoInvestigacion(id);
        alert("Grupo eliminado con éxito");
        const updatedGrupos = await this.servicioGruposInvestigacion.getAll();
        this.setState({ researchGroups: updatedGrupos.data });
      } catch (error) {
        console.error("Error al eliminar el grupo:", error);
        alert("Hubo un error al eliminar el grupo");
      }
    }
  };

  render() {
    return (
      <div className="App">
        <div className="contenedor-principal">
          <Container className="titulos">
            <h2>Institutos de Investigación</h2>
          </Container>
          {this.state.researchItems.map((item) => (
            <div key={item.institutoId} className="card-container">
              <CardResearchInstitute {...item} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <CardUpdate
                  onActualizarInstitutoInvestigacion={() => this.servicioInstitutosInvestigacion.getAll()}
                  tipoFormulario="InstitutoInvestigacion"
                  existingData={item}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDeleteInstituto(item.institutoId)}
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
  
          <CardPlus onAgregarInstitutoInvestigacion={() => this.servicioInstitutosInvestigacion.getAll()} tipoFormulario="InstitutoInvestigacion" />
  
          <Container className="titulos">
            <h2>Centros de Investigación</h2>
          </Container>
          {this.state.researchCenters.map((item) => (
            <div key={item.idCentroInvestigacion} className="card-container">
              <CardResearchCenters {...item} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <CardUpdate
                  onActualizarCentroInvestigacion={() => this.servicioCentrosInvestigacion.getAll()}
                  tipoFormulario="CentroInvestigacion"
                  existingData={item}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDeleteCentro(item.idCentroInvestigacion)}
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
  
          <CardPlus onAgregarCentroInvestigacion={() => this.servicioCentrosInvestigacion.getAll()} tipoFormulario="CentroInvestigacion" />
  
          <Container className="titulos">
            <h2>Sociedades Científicas</h2>
          </Container>
          {this.state.cientistSocieties.map((item) => (
            <div key={item.sociedadId} className="card-container">
              <CardScientificSocieties {...item} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <CardUpdate
                  onActualizarSociedadCientifica={() => this.servicioSociedadesCientificas.getAll()}
                  tipoFormulario="SociedadCientifica"
                  existingData={item}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDeleteSociedad(item.sociedadId)}
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
  
          <CardPlus onAgregarSociedadCientifica={() => this.servicioSociedadesCientificas.getAll()} tipoFormulario="SociedadCientifica" />
  
          <Container className="titulos">
            <h2>Grupos de Investigación</h2>
          </Container>
          {this.state.researchGroups.map((item) => (
            <div key={item.grupoInvestigacionId} className="card-container">
              <CardResearchGroup {...item} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <CardUpdate
                  onActualizarGrupoInvestigacion={() => this.servicioGruposInvestigacion.getAll()}
                  tipoFormulario="GrupoInvestigacion"
                  existingData={item}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDeleteGrupo(item.grupoInvestigacionId)}
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
  
          <CardPlus onAgregarGrupoInvestigacion={() => this.servicioGruposInvestigacion.getAll()} tipoFormulario="GrupoInvestigacion" />
  
          <LogoutButton />
        </div>
      </div>
    );
  }
  
}

//export default InvestigacionAdmin;
export default withAuthenticationRequired(InvestigacionAdmin);

/*
// InvestigacionAdmin.js

import React, { Component } from 'react';
import { ServicioInstitutosInvestigacion } from '../../servicios/ServicioInstitutosInvestigacion';
import { ServicioSociedadesCientificas } from '../../servicios/ServicioSociedadesCientificas';
import { ServicioCentrosInvestigacion } from '../../servicios/ServicioCentrosInvestigacion';
import { ServicioGruposInvestigacion } from '../../servicios/ServicioGruposInvestigacion';
import NavbarComponent from '../../componentes/Navbar';
import Container from 'react-bootstrap/Container';
import CardResearchInstitute from '../../componentes/CardResearchInstitute';
import CardScientificSocieties from '../../componentes/CardScientificSocieties';
import CardUpdate from '../../componentes/CardUpdate';
import CardPlus from '../../componentes/CardPlus';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { LogoutButton } from '../../componentes/Logout';
import CardResearchCenters from '../../componentes/CardResearchCenters';
import CardResearchGroup from '../../componentes/CardResearchGroup';
import '../../../src/InvestigacionAdmin.css'; // Importa el archivo de estilos CSS

class InvestigacionAdmin extends Component {
  constructor() {
    super();
    this.state = {
      researchItems: [],
      cientistSocieties: [],
      researchCenters: [],
      researchGroups: [],
      dataLoaded: false, // Nuevo estado para verificar si los datos ya se cargaron
    };
    this.servicioInstitutosInvestigacion = new ServicioInstitutosInvestigacion();
    this.servicioSociedadesCientificas = new ServicioSociedadesCientificas();
    this.servicioCentrosInvestigacion = new ServicioCentrosInvestigacion();
    this.servicioGruposInvestigacion = new ServicioGruposInvestigacion();
  }

  componentDidMount() {
    // Verificar si los datos ya se cargaron antes de hacer nuevas llamadas
    if (!this.state.dataLoaded) {
      this.fetchData();
    }
  }

  // Función para cargar datos desde el backend
  fetchData() {
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

    // Actualizar el estado para indicar que los datos se han cargado
    this.setState({ dataLoaded: true });
  }

  render() {
    return (
      <div className="App">
        
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
              <CardUpdate onActualizarInstitutoInvestigacion={() => this.servicioInstitutosInvestigacion.getAll()} tipoFormulario="InstitutoInvestigacion" existingData={item} />
            </div>
          ))}

          <CardPlus onAgregarInstitutoInvestigacion={() => this.servicioInstitutosInvestigacion.getAll()} tipoFormulario="InstitutoInvestigacion" />

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
              <CardUpdate onActualizarCentroInvestigacion={() => this.servicioCentrosInvestigacion.getAll()} tipoFormulario="CentroInvestigacion" existingData={item} />
            </div>
          ))}

          <CardPlus onAgregarCentroInvestigacion={() => this.servicioCentrosInvestigacion.getAll()} tipoFormulario="CentroInvestigacion" />

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
              <CardUpdate onActualizarSociedadCientifica={() => this.servicioSociedadesCientificas.getAll()} tipoFormulario="SociedadCientifica" existingData={item} />
            </div>
          ))}
          <CardPlus onAgregarSociedadCientifica={() => this.servicioSociedadesCientificas.getAll()} tipoFormulario="SociedadCientifica" />

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
              <CardUpdate onActualizarGrupoInvestigacion={() => this.servicioGruposInvestigacion.getAll()} tipoFormulario="GrupoInvestigacion" existingData={item} />
            </div>
          ))}
          <CardPlus onAgregarGrupoInvestigacion={() => this.servicioGruposInvestigacion.getAll()} tipoFormulario="GrupoInvestigacion" />
        <LogoutButton />
        </div>
      </div>
    );
  }
}

//export default InvestigacionAdmin;
export default withAuthenticationRequired(InvestigacionAdmin);*/