// src/components/Header.js
import React from 'react';
import { FaSatellite } from 'react-icons/fa'; // 1. Importa el icono que te guste
import { Link } from 'react-scroll'; // 1. Importa Link en lugar de <a>
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-content">
        {/* 2. Crea un contenedor para el título y el icono */}
        <div className="site-title-container">
          <FaSatellite className="site-icon" />
          <h1 className="site-title">Subsidence-SAR</h1>
        </div>
        <nav className="site-nav">
          <Link
            activeClass="active" // Clase CSS cuando el link está activo (en vista)
            to="intro"           // El 'name' del Element al que apunta
            spy={true}           // "Espía" el scroll para activar la clase
            smooth={true}        // ¡Activa la animación suave!
            offset={-80}         // Offset para compensar la altura del header
            duration={500}       // Duración de la animación en ms
          >Inicio</Link>
          <Link
            activeClass="active"
            to="problema"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >Problema </Link>
          <Link
            activeClass="active"
            to="final"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >Solución</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;