import React from 'react';
import { FaSatellite } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import './Header.css'; 

const HeaderSimple = () => {
  return (
    <header className="site-header">
      <div className="header-content">
        {}
        <Link to="/" className="site-title-link">
          <div className="site-title-container">
            <FaSatellite className="site-icon" />
            <h1 className="site-title">Subsidence-SAR</h1>
          </div>
        </Link>
        <nav className="site-nav">
          {}
          <Link to="/">
            Volver
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderSimple;