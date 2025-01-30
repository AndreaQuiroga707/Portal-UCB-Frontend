import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { verificarRol } from "../../utils/authUtils";
import { ServicioInstitutosInvestigacion } from "../../servicios/ServicioInstitutosInvestigacion";
import Container from "react-bootstrap/Container";
import CardPlus from "../../componentes/CardPlus";
import { LogoutButton } from "../../componentes/Logout";
import CardUpdate from "../../componentes/CardUpdate";
import { Trash } from "react-bootstrap-icons";
import CardResearchInstitute from '../../componentes/CardResearchInstitute';
import FormResearchInstitute from "../../componentes/Forms/FormResearchInstitute";


const InvestigacionAdmin = () => {
  const [institutos, setInstitutos] = useState([]);
  const [showInstitutoForm, setShowInstitutoForm] = useState(false);
  const [tienePermiso, setTienePermiso] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [refresh, setRefresh] = useState(false); // Control de actualización
  const navigate = useNavigate();

  // Instancia del servicio usando useMemo
  const servicioInstitutos = useMemo(() => new ServicioInstitutosInvestigacion(), []);

  useEffect(() => {
    if (!verificarRol("ADMIN2")) {
      setTienePermiso(false);
      setMensaje("No tienes permisos para acceder a esta página.");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    const fetchData = async () => {
      try {
        const institutosData = await servicioInstitutos.getAll();
        setInstitutos(institutosData.data);
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
    setShowInstitutoForm(false);
  };

  const handleAddInstituto = async (nuevoInstituto) => {
    try {
      await servicioInstitutos.postInstitutoInvestigacion(nuevoInstituto);
      setRefresh(prev => !prev); // Forzar actualización
    } catch (error) {
      console.error("Error al crear el instituto:", error);
      alert("Hubo un error al crear el instituto.");
    }
  };

  const handleUpdateInstituto = async (institutoActualizado) => {
    try {
      await servicioInstitutos.putInstitutoInvestigacion(institutoActualizado);
      alert("Instituto actualizado con éxito");
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("Error al actualizar el instituto:", error);
      alert("Hubo un error al actualizar el instituto.");
    }
  };

  const handleDeleteInstituto = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este instituto?")) {
      try {
        await servicioInstitutos.deleteInstitutoInvestigacion(id);
        alert("Instituto eliminado con éxito");
        setRefresh(prev => !prev);
      } catch (error) {
        console.error("Error al eliminar el instituto:", error);
        alert("Hubo un error al eliminar el instituto.");
      }
    }
  };

  return (
    <div className="App">
      <div className="contenedor-principal">
        <Container className="titulos">
          <h2>Institutos de Investigación</h2>
        </Container>

        {institutos &&
          institutos.map((instituto) => (
            <div key={instituto.institutoId} className="card-container">
              <CardResearchInstitute
                nombre={instituto.nombre}
                enlaceImagen={instituto.enlaceImagen}
                enlaceWeb={instituto.enlaceWeb}
                lineasInvestigacion={instituto.lineasInvestigacion}
                descripcion={instituto.descripcion}
                carrera={instituto.carrera}  // 📌 Se pasa el objeto carrera
                contacto={instituto.contacto} // 📌 Se pasa el objeto contacto
              />

              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <CardUpdate
                  tipoFormulario="instituto"
                  onUpdate={handleUpdateInstituto}
                  existingData={instituto}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteInstituto(instituto.id)}
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
          onAgregarInstitutoInvestigacion={handleAddInstituto}
          tipoFormulario="InstitutoInvestigacion"
          setRefresh={setRefresh} 
        />

        {showInstitutoForm && (
          <FormResearchInstitute 
            onAgregarInstitutoInvestigacion={handleAddInstituto}
            onCerrarFormulario={handleCloseForm}
            setRefresh={setRefresh}   // 📌 Pasar la función de actualización
          />
        )}




        <LogoutButton />
      </div>
    </div>
  );
};

export default InvestigacionAdmin;


/*
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
*/