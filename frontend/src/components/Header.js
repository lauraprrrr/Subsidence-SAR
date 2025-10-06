import React, { useState } from 'react'; 
import { FaSatellite } from 'react-icons/fa';
import { Link } from 'react-scroll';
import './Header.css';

const Header = ({ activeLink }) => {
  const navItems = [
    {
      key: 'intro',
      label: 'Inicio',
      subItems: [
        { to: 'intro-1', label: 'Hundimiento' },
        { to: 'intro-2', label: 'Subsidencia' },
        { to: 'intro-3', label: 'Rol de la DGA' }
      ]
    },
    {
      key: 'problema',
      label: 'Problema',
      subItems: [
        { to: 'problema-1', label: 'Sobreextracción' },
        { to: 'problema-2', label: 'Seguridad Hídrica' },
        { to: 'problema-3', label: 'La Evidencia' }
      ]
    },
    {
      key: 'solucion',
      label: 'Solución',
      subItems: [
        { to: 'solucion-1', label: 'Fiscalización' },
        { to: 'solucion-2', label: 'Análisis SAR' },
        { to: 'solucion-3', label: 'Monitoreo Proactivo' }
      ]
    }
  ];
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="site-header">
      <div className="header-content">
        
        {}
        <Link
          to="intro-1"     
          smooth={true}
          offset={-80}
          duration={500}
          className="site-title-link" 
        >
          <div className="site-title-container">
            <FaSatellite className="site-icon" />
            <h1 className="site-title">Subsidence-SAR</h1>
          </div>
        </Link>

        <nav className="site-nav">
          {navItems.map((item) => (
            <div 
              key={item.key} 
              className="nav-item"
              onMouseEnter={() => setOpenMenu(item.key)} 
              onMouseLeave={() => setOpenMenu(null)}   
            >
              <span className={activeLink.startsWith(item.key) ? 'nav-label active' : 'nav-label'}>
                {item.label}
              </span>

              {}
              <div className={`dropdown-menu ${openMenu === item.key ? 'open' : ''}`}>
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.to}
                    to={subItem.to}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    onClick={() => setOpenMenu(null)} 
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;