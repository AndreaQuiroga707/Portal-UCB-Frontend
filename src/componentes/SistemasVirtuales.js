// SistemasVirtuales.js

import React from 'react';
import '../SistemasVirtuales.css';
import SV001 from '../imagenes/SV001.png';
import SV002 from '../imagenes/SV002.png';
import SV003 from '../imagenes/SV003.png';
import SV004 from '../imagenes/SV004.png';
import SV005 from '../imagenes/SV005.png';
import SV006 from '../imagenes/SV006.png';
import SV007 from '../imagenes/SV007.png';
import SV008 from '../imagenes/SV008.png';
import SV009 from '../imagenes/SV009.png';
import SV010 from '../imagenes/SV010.png';
import SV011 from '../imagenes/SV011.png';
import { LoginButton } from '../componentes/Login';


const SistemasVirtuales = () => {
return (
    <div className="secciones">
      <h2 className="SistemasVirtuales">Sistemas virtuales</h2>
      <div className="separador"></div>
      <h2 class="SistemasVirtuales">Estudiantes</h2>
      
      <div class="svimage">
        <a href="https://academico.ucb.edu.bo/AcademicoNacional/login" target="_blank">
            <img src={SV001} alt="Imagen 1"></img>
        </a>
        <a href="https://neo.ucb.edu.bo/" target="_blank">
            <img src={SV002} alt="Imagen 2"></img>
        </a>
        <a href="mailto:correo@example.com" >
            <img src={SV003} alt="Imagen 3"></img>
        </a>
        <a href="https://login.microsoftonline.com/" target="_blank">
            <img src={SV004} alt="Imagen 4"></img>
        </a>
        <a href="https://www.youtube.com/watch?v=v0GuPCOtuuE" target="_blank">
            <img src={SV005} alt="Imagen 5"></img>
        </a>
        
      </div>
      <div class="svimage" id="second-set">
        <a href="https://drive.google.com/file/d/1gsbovpSAEU8m2aZjo3DOubqs1dkscTmC/view?usp=sharing" download>
            <img src={SV006} alt="Imagen 6"></img>
        </a>
        <a href="https://cajap.ucb.edu.bo/UCBPagosWeb/Default.aspx" target="_blank">
            <img src={SV009} alt="Imagen 9"></img>
        </a>

      </div>
      <button className="show-more-button" onClick={mostrarMas}>
        Mostrar más
      </button>

      <h2 class="SistemasVirtuales">Docentes</h2>
    <div class="svimage">
        <a href="https://academico.ucb.edu.bo/AcademicoNacional/login" target="_blank">
            <img src={SV001} alt="Imagen 11"></img>
        </a>
        <a href="https://neo.ucb.edu.bo/" target="_blank">
            <img src={SV002} alt="Imagen 12"></img>
        </a>
        <a href="mailto:correo@example.com" >
            <img src={SV003} alt="Imagen 13"></img>
        </a>
        <a href="https://login.microsoftonline.com/" target="_blank">
            <img src={SV004} alt="Imagen 14"></img>
        </a>
        <a href="https://drive.google.com/file/d/1gsbovpSAEU8m2aZjo3DOubqs1dkscTmC/view?usp=sharing" download>
            <img src={SV006} alt="Imagen 15"></img>
        </a>
    </div>

    <h2 class="SistemasVirtuales">Administrativo</h2>
    <div class="svimage">
        <a href="https://academico.ucb.edu.bo/AcademicoNacional/login" target="_blank">
            <img src={SV011} alt="Imagen 16"></img>
        </a>
        <a href="https://neo.ucb.edu.bo/" target="_blank">
            <img src={SV002} alt="Imagen 17"></img>
        </a>
        <a href="mailto:correo@example.com" >
            <img src={SV003} alt="Imagen 18"></img>
        </a>
        <a href="https://login.microsoftonline.com/" target="_blank">
            <img src={SV004} alt="Imagen 19"></img>
        </a>
    </div>



      <div class="svimage" id="second-set-administrativo">
      <LoginButton /> 
      </div>
      <button className="show-more-button2" onClick={mostrarMasAdministrativo}>
        Mostrar más
      </button>
    </div>
  );
};

function mostrarMas() {
  var secondSet = document.getElementById("second-set");
  var button = document.querySelector(".show-more-button");

  if (secondSet.style.display === "none" || secondSet.style.display === "") {
    secondSet.style.display = "flex";
    button.textContent = "Mostrar menos";
  } else {
    secondSet.style.display = "none";
    button.textContent = "Mostrar más";
  }
}

function mostrarMasAdministrativo() {
  var secondSet = document.getElementById("second-set-administrativo");
  var button = document.querySelector(".show-more-button2");

  if (secondSet.style.display === "none" || secondSet.style.display === "") {
    secondSet.style.display = "flex";
    button.textContent = "Mostrar menos";
  } else {
    secondSet.style.display = "none";
    button.textContent = "Mostrar más";
  }
}

export default SistemasVirtuales;
