import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-content">
        <h1 className="site-title">Subsidence-SAR</h1>
        <nav className="site-nav">
          <a href="#intro">Inicio</a>
          <a href="#capitulo1">Problema</a>
          <a href="#final">Solución</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;