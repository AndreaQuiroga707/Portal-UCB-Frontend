import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import InicioAdmin from './paginas/Admin/InicioAdmin';
import SeccionesAcademicas from './paginas/SeccionesAcademicas';
import AdmisionYBecas from './paginas/AdmisionYBecas';
import PlataformaEnLinea from './paginas/PlataformaEnLinea';
import Investigacion from './paginas/Investigacion';
import RecursosEstudiantes from './paginas/RecursosEstudiantes';
import RecursosServicio from './paginas/RecursosServicio';
import PortalEgresados from './paginas/PortalEgresados';
import NavbarComponent from './componentes/Navbar';
import NavbarAdmin from './componentes/NavbarAdmin';
import InvestigacionAdmin from './paginas/Admin/InvestigacionAdmin';
import FooterComponent from './componentes/FooterComponent';
import ProgramaEmpleabilidad from './paginas/ProgramaEmpleabilidad';
import FeriaEmpleo from './paginas/FeriaEmpleo';
import CareerView from './paginas/CareerView';
import LoginPage from "./paginas/LoginPage"; // Página de login
import GestionUsuarios from './paginas/Gestor/GestionUsuarios';
import CrearCuenta from './paginas/Gestor/CrearCuenta';

function App() {
  return (
    <div>
      {/* Navbar para sección principal */}
      <Routes>
        <Route path="/" element={<NavbarComponent />} />
        <Route path="/carrera/:careerId" element={<NavbarComponent />} />
        <Route path="/secciones-academicas" element={<NavbarComponent />} />
        <Route path="/admision-y-becas" element={<NavbarComponent />} />
        <Route path="/plataforma-en-linea" element={<NavbarComponent />} />
        <Route path="/investigacion" element={<NavbarComponent />} />
        <Route path="/recursos-estudiantes" element={<NavbarComponent />} />
        <Route path="/recursos-servicio" element={<NavbarComponent />} />
        <Route path="/portal-egresados" element={<NavbarComponent />} />
        <Route path="/programa-empleabilidad" element={<NavbarComponent />} />
        <Route path="/feria-empleo" element={<NavbarComponent />} />
      </Routes>

      {/* Navbar para sección de administración */}
      <Routes>
        <Route path="/admin/*" element={<NavbarAdmin />} />
      </Routes>

      {/* Rutas para la aplicación */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/carrera/:careerId" element={<CareerView />} />
        <Route path="/secciones-academicas" element={<SeccionesAcademicas />} />
        <Route path="/admision-y-becas" element={<AdmisionYBecas />} />
        <Route path="/plataforma-en-linea" element={<PlataformaEnLinea />} />
        <Route path="/investigacion" element={<Investigacion />} />
        <Route path="/recursos-estudiantes" element={<RecursosEstudiantes />} />
        <Route path="/recursos-servicio" element={<RecursosServicio />} />
        <Route path="/portal-egresados" element={<PortalEgresados />} />
        <Route path="/programa-empleabilidad" element={<ProgramaEmpleabilidad />} />
        <Route path="/feria-empleo" element={<FeriaEmpleo />} />
        <Route path="/login" element={<LoginPage />} /> {/* Página de login */}
        <Route path="*" element={<h1>404: Not Found</h1>} />

        {/* Rutas específicas de administración */}
        <Route path="/admin" element={<InicioAdmin />} />
        <Route path="/admin/investigacion" element={<InvestigacionAdmin />} />

         {/* Rutas específicas del Gestor */}
        <Route path="/gestor/usuarios" element={<GestionUsuarios />} />
        <Route path="/gestor/crear-cuenta" element={<CrearCuenta />} />
      </Routes>

      <FooterComponent />
    </div>
  );
}

export default App;