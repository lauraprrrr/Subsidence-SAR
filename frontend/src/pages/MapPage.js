import React from 'react';
import './MapPage.css';

import HeaderSimple from '../components/HeaderSimple';
import Footer from '../components/Footer';

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
      {}
      <div className="map-layout-container">
        
        {}
        <div className="map-viewer">
          <img src={mapaEjemplo} alt="Mapa de subsidencia del terreno en Santiago" />
        </div>

        {}
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