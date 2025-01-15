import React from 'react';
import '../App.css';
import RE001 from '../imagenes/RE001.png';
import RE002 from '../imagenes/RE002.png';
import RE003 from '../imagenes/feria.png';
import RE004 from '../imagenes/RE004.png';
import RE005 from '../imagenes/RE005.png';
import { Link } from 'react-router-dom';
const Componente = () => {
return (
    <div className="body-styling">
    <div className="componente">
        <img src={RE001} alt="Imagen 1" />
        <div className="descripcion">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeXc9mozt1UL_rux4rMIAaGEZb6qQGgteZLBVg4ZM-ugYNkbw/viewform" target="_blank" rel="noopener noreferrer">
            <h2 className='Subtitulos'>Talleres de Empleabilidad</h2>
        </a>

        <p>Complementando tu formación académica, la USEI te apoya con el desarrollo de competencias laborales para que tengas una favorable transición al mercado laboral.</p>
        </div>
    </div>

    <div className="componente">
        <img src={RE002} alt="Imagen 2" />
        <div className="descripcion">
       
        <a href="http://encuestasacademicas.ucb.edu.bo/limesurvey/index.php/663945?lang=es" target="_blank" rel="noopener noreferrer">
            <h2 className='Subtitulos'> <Link to="/programa-empleabilidad" className='Subtitulos'>Encuesta a tiempo de graduación</Link></h2>
        </a>
        <p>Registrate para recibir más información profesional.</p>
        </div>
    </div>

    <div className="componente">
        <img src={RE003} alt="Imagen 3" />
        <div className="descripcion">
        <h2 className='Subtitulos'><Link to="/feria-empleo" className='Subtitulos'>Feria del empleo UCB</Link></h2>
        <p>Nuevamente la Universidad Católica Boliviana “San Pablo” (U.C.B.), organiza a nivel nacional, del 10 al 28 de julio de 2023, la tercera versión de la “Ferial del empleo UCB”.</p>
        </div>  
    </div>


    <div className="componente">
        <img src={RE005} alt="Imagen 5" />
        <div className="descripcion">
        <h2 className='Subtitulos'>
        <Link to="/portal-egresados" className='Subtitulos'>Alumni</Link>
        </h2>
        <p>AlumniUCB es una asociación de egresados de la Universidad Católica Boliviana, que busca mantener el vínculo entre ellos y la institución</p>
        </div>
    </div>
    </div>
);
};

export default Componente;
