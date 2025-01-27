import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function NavbarAdmin() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar expand="md" collapseOnSelect expanded={expanded} className="custom-bg" variant="dark">
        <Container>
          <Navbar.Brand>
            <img src={require('../imagenes/Cato-logo.png')} alt="Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin" className="navbar-link">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/admin/investigacion">Investigacion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavbarAdmin;