// src/App.js

import './App.css';
import Header from './components/Header';
import StorySection from './components/StorySection';

// 1. Importamos nuestras imágenes desde la carpeta assets
import santiagoImg from './assets/santiago.jpeg'; // Reemplaza con tus nombres de archivo
import radarImg from './assets/radar.jpg';
import terrenoImg from './assets/terreno.jpg';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="story-container">
        {/* 2. Pasamos cada imagen a la prop imageUrl */}
        <StorySection id="intro" imageUrl={santiagoImg}>
          <h2>El Hundimiento Silencioso</h2>
          <p>
            Bajo la superficie de la Región Metropolitana, un cambio invisible está ocurriendo.
            La extracción de agua subterránea está provocando que el terreno ceda lentamente,
            un fenómeno con consecuencias profundas para nuestro futuro.
          </p>
        </StorySection>

        <StorySection id="capitulo1" imageUrl={radarImg}>
          <h2>Viendo lo Invisible con SAR</h2>
          <p>
            Como un espejo mágico, los satélites con Radar de Apertura Sintética (SAR) nos
            permiten atravesar el velo de lo aparente. Sus pulsos de radar revelan deformaciones
            milimétricas en la superficie de la Tierra, día y noche, sin importar las nubes.
          </p>
        </StorySection>

        <StorySection id="final" imageUrl={terrenoImg}>
          <h2>Las Cicatrices del Tiempo</h2>
          <p>
            Al comparar imágenes SAR a lo largo de los años, el hundimiento se hace evidente.
            Zonas enteras se hunden, afectando la infraestructura y la seguridad hídrica.
            Estos datos son un llamado a la acción para una gestión sostenible de nuestros recursos.
          </p>
        </StorySection>
      </main>
    </div>
  );
}

export default App;