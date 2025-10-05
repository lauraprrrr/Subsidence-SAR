// src/components/HeaderSimple.js
import React from 'react';
import { FaSatellite } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ¡Importante! Usamos el Link de react-router-dom
import './Header.css'; // Reutilizamos los estilos existentes

const HeaderSimple = () => {
  return (
    <header className="site-header">
      <div className="header-content">
        {/* Hacemos que el título y el icono sean un enlace a la página de inicio */}
        <Link to="/" className="site-title-link">
          <div className="site-title-container">
            <FaSatellite className="site-icon" />
            <h1 className="site-title">Subsidence-SAR</h1>
          </div>
        </Link>
        <nav className="site-nav">
          {/* El único botón será un enlace a la página de inicio */}
          <Link to="/">
            Volver
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderSimple;