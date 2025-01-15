import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare, faXTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function FooterComponent() {
  return (
    <Navbar className="custom-bg" variant="dark">
      <Container className="justify-content-between">
        <Navbar.Text>
          © Copyright Universidad Católica Boliviana "San Pablo" Regional La Paz
        </Navbar.Text>
        <div className="social-icons">
          <a href="https://www.instagram.com/ucb.lapaz/" className="navbar-icon">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://www.facebook.com/UCB.BOLIVIA/" className="navbar-icon">
            <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
          </a>
          <a href="https://twitter.com/UCBLaPaz" className="navbar-icon">
            <FontAwesomeIcon icon={faXTwitter} size="lg" />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=59175851671&text&type=phone_number&app_absent=0"
            className="navbar-icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
          </a>
        </div>
      </Container>
    </Navbar>
  );
}

export default FooterComponent;