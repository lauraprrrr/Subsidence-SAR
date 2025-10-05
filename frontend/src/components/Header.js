// src/components/Header.js
import React from 'react';
import { FaSatellite } from 'react-icons/fa'; // 1. Importa el icono que te guste
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
          <a href="#intro">Inicio</a>
          <a href="#problema">Problema</a>
          <a href="#final">Solución</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;