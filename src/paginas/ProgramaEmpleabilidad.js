import React from 'react';
import ImagePanel from '../componentes/ImagePanel/ImagePanel';
import QrUser from '../imagenes/qr-usei.png';
import '../App.css';

const RecursosServicio = () => {
  return (
    
    <div >
      <ImagePanel title="Programa de Empleabilidad"/>
      <div className='ProgEmpConteiener'>
        <p>Para completar la “ENCUESTA PARA GRADUADOS” sigue los siguientes pasos:</p>
        <p>Escanea el siguiente código QR o entra al siguiente enlace:</p>
        <div className='Qr'>
        <a>
                <img src={QrUser} alt="Imagen 5" />
        </a>
        <p></p>
        <a className='linkPE' href="https://bit.ly/2GQTFTt">https://bit.ly/2GQTFTt</a>
        </div>

        <h2>Completa la encuesta</h2>
        /**/

  <p>Cuando te pida el correo electrónico, utiliza tu correo electrónico personal no el de la universidad, pues allí te contactaremos a futuro.</p>

  <p>Para recibir el <strong>"CERTIFICADO DE LA ENCUESTA DE GRADUADOS"</strong>:</p>

  <ol>
    <li>Verifica que ingresaste tu correo electrónico correcto.</li>
    <li>El certificado te llegará al correo electrónico que registraste en menos de 72 horas después de haber respondido a todas las preguntas de la encuesta.</li>
    <li>Si no recibes el certificado, puedes escribir a <a href="mailto:lpz@ucb.edu.bo">lpz@ucb.edu.bo</a> o llamar al <a href="tel:+5912692723">2692723</a> / <a href="tel:+59176521445">76521445</a>.</li>
  </ol>

  <p><strong>TOMA EN CUENTA:</strong> si no respondiste TODA la encuesta, no te llegará el certificado. La USEI es responsable de certificar que se respondió íntegramente la encuesta, para lo cual accederá a la base de datos con el fin de verificar cada caso.</p>
        

      </div>
      {/* Agrega aquí el contenido específico para la sección de recursos para estudiantes */}
    </div>
  );
}

export default RecursosServicio;
