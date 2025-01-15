import React from 'react';
import '../App.css';
import SO1 from '../imagenes/SO1.png';
import SO2 from '../imagenes/SO2.png';

const Componente = () => {
return (
    <div className="body-stylingSO">
    <div className="componenteSO">
        <img src={SO1} alt="Imagen 1" />
    </div>

    <div className="componenteSO">
        <div className="descripcionSO">
        <p>Paso 1</p>
        <p>Ingresa por el link de Servicio de Orientación Vocacional que te llegará por Whatsapp en las fechas programadas.</p>
        <p>Paso 2</p>
        <p>Completa la prueba de Orientación Vocacional y llena tus datos correctamente.</p>
        <p>Importante: Para dar la prueba debes tener de 17 a 19 años</p>
        <p>Paso 3</p>
        <p>Los resultado se te enviarán a tu correo electrónico en aproximadamente 2 semana. (Esto es porque es una evaluación completa, especializada y personalizada).</p>
        </div>
    </div>

    <div className="componenteSO">
        <div className="descripcionSO">
        <p>El Departamento de Psicología, conjuntamente con el Departamento de Admisión y Orientación, brinda un servicio de Orientación Vocacional virtual personalizado y en forma gratuita, a todos los estudiantes que no se encuentren seguros sobre la elección de su futura carrera profesional, con la finalidad de poder ayudar a los estudiantes a elegir una carrera acorde a sus habilidades, vocación y competencias.</p>
        <p>Contamos con un equipo de especialistas en formación humana que apoyan en todo el proceso a los estudiantes; permitiéndoles identificar sus habilidades, sus intereses y características de su personalidad por medio de pruebas.</p>
        <p>Los resultados se constituyen en una herramienta útil que ayudará al estudiante en la definición de su plan de vida profesional.</p>
        <p>Contacto: admision@ucb.edu.bo</p>
        </div>
    </div>

    <div className="componenteSO">
        <img src={SO2} alt="Imagen 2" />
    </div>
    </div>
);
};

export default Componente;
