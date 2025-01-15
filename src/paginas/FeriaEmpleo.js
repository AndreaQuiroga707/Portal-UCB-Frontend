import React from 'react';
import Componente from '../componentes/Componente.js';
import ImagePanel from '../componentes/ImagePanel/ImagePanel';
import Cover from '../imagenes/Cover-Feria.png';
import '../App.css';

const RecursosEstudiantes = () => {
  return (
    <div>
      <ImagePanel title="Feria del empleo UCB"/>
      <div className='FeriaConteiner'>
            <p><strong>RN 03.07.2023.</strong> Nuevamente la Universidad Católica Boliviana “San Pablo” (U.C.B.), organiza a nivel nacional, del 10 al 28 de julio de 2023, la</p>
            <p>tercera versión de la “Ferial del empleo UCB” (virtual), con el objetivo de que los jóvenes estudiantes y titulados de la universidad, conozcan las</p>
            <p>empresas que hay en nuestro país, los servicios que ofrecen y la forma en que llevan adelante la selección y contratación de su personal.</p>

            <iframe width="560" height="315" src="https://www.youtube.com/embed/rEy82wjUyTU" frameborder="0" allowfullscreen></iframe>
            <p>La Dra. Ximena Peres, Rectora de Sede La Paz, a tiempo de dar la bienvenida a las empresas que participarán en la feria del empleo, nos brinda</p>
            <p>mayores detalles de todo el esfuerzo que hace la U.C.B., para que los estudiantes y graduados en todo el país, puedan acceder a oportunidades</p>
            <p>laborales concretas.</p>

            <iframe width="560" height="315" src="https://www.youtube.com/embed/c1SrsFa5ZvQ" frameborder="0" allowfullscreen></iframe>

            <p>Por su parte la Directora Académica de Sede La Paz, Yolanda Ferreira, describe en líneas generales, cómo y qué encontrarán los estudiantes y</p>
            <p>graduados durante la feria y cómo sacar el máximo provecho de esta información en función a sus expectativas laborales y estudios realizados.</p>

            <iframe width="560" height="315" src="https://www.youtube.com/embed/Si5RjpvlpMw" frameborder="0" allowfullscreen></iframe>
            <p>Para mayores informes, los interesados pueden escribir al correo electrónico usei.lpz@ucb.edu.bo o comunicarse al número de celular: 76521445</p>
            <div className='imagencover'>
            <img src={Cover} alt="Imagen 5" />
            </div>
      </div>
      {/* Agrega aquí el contenido específico para la sección de recursos para estudiantes */}
      /**/
    </div>
  );
}

export default RecursosEstudiantes;