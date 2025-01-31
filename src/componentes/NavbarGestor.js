import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function NavbarGestor() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar expand="md" collapseOnSelect expanded={expanded} className="custom-bg" variant="dark">
        <Container>
          {/* Logo del sistema */}
          <Navbar.Brand>
            <img src={require('../imagenes/Cato-logo.png')} alt="Logo" className="navbar-logo" />
          </Navbar.Brand>

          {/* Botón de menú para dispositivos pequeños */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />

          {/* Enlaces del Navbar */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/gestor/usuarios" className="navbar-link" onClick={() => setExpanded(false)}>
                Gestión de Usuarios
              </Nav.Link>
              <Nav.Link as={Link} to="/gestor/crear-cuenta" className="navbar-link" onClick={() => setExpanded(false)}>
                Crear Cuenta
              </Nav.Link>
              <Nav.Link as={Link} to="/gestor/logs" className="navbar-link" onClick={() => setExpanded(false)}>
                Logs
              </Nav.Link>
            </Nav>

            {/* Botón para cerrar sesión */}
            <Nav>
              <Nav.Link as={Link} to="/login" className="navbar-link" onClick={() => localStorage.removeItem('token')}>
                <Button variant="danger">Cerrar Sesión</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Espacio donde se renderizan las páginas vinculadas al navbar */}
      <Outlet />
    </>
  );
}

export default NavbarGestor;
