// src/pages/MapPage.js
import React from 'react';
import './MapPage.css';

// 1. Importa los componentes de navegación
import HeaderSimple from '../components/HeaderSimple';
import Footer from '../components/Footer';

// Importamos las imágenes que usaremos
import santiagoBg from '../assets/santiago.jpeg';
import mapaEjemplo from '../assets/mapa_ejemplo.png';

const MapPage = () => {
  const pageStyle = {
    backgroundImage: `url(${santiagoBg})`
  };

  return (
    <>
    <HeaderSimple/>
    <div className="map-page" style={pageStyle}>
      {/* Por ahora no tenemos Header ni Footer, los añadiremos después */}
      <div className="map-layout-container">
        
        {/* Columna Izquierda: El Visor del Mapa */}
        <div className="map-viewer">
          <img src={mapaEjemplo} alt="Mapa de subsidencia del terreno en Santiago" />
        </div>

        {/* Columna Derecha: La Descripción */}
        <div className="map-description">
          <h2>Análisis Interferométrico (InSAR)</h2>
          <p>
            Este mapa ha sido generado utilizando la técnica de Radar de Apertura Sintética Interferométrico (InSAR).
            Permite medir con precisión milimétrica las deformaciones de la superficie terrestre a lo largo del tiempo.
          </p>
          <p>
            Las áreas en tonos rojos indican un hundimiento (subsidencia) significativo, mientras que los tonos azules o verdes
            muestran zonas de mayor estabilidad. Estos datos son cruciales para entender el impacto de la extracción de
            aguas subterráneas.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default MapPage;