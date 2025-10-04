// src/components/Header/Header.js

import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-content">
        <h1 className="site-title">El Viaje de la Tierra</h1>
        <nav className="site-nav">
          <a href="#intro">Inicio</a>
          <a href="#capitulo1">Capítulo 1</a>
          <a href="#final">Final</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;