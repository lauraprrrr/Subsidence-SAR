// src/App.js

import './App.css';
import Header from './components/Header';
import StorySection from './components/StorySection';
import ImageComparator from './components/ImageComparator';
import SolutionCard from './components/SolutionCard'; // 1. Importa el nuevo componente de tarjeta

// ... (las otras importaciones de imágenes se mantienen igual)
import santiagoImg from './assets/santiago.jpeg';
import radarImg from './assets/radar.jpg';
import terrenoImg from './assets/terreno.jpg';
import sarBefore from './assets/sar_2020.png'; // Teniendo en cuenta tu .png
import sarAfter from './assets/sar_2025.jpeg';
import Footer from './components/Footer'; // Importa el Footer



function App() {
  return (
    <div className="App">
      <Header />
      <main className="story-container">
        {/* ... (Las secciones "intro" y "problema" se mantienen igual) ... */}
        
        <StorySection id="intro" imageUrl={santiagoImg}>
          <h2>El Hundimiento Silencioso de Santiago</h2>
          <p>Bajo nuestros pies, la tierra cede. La extracción insostenible de agua subterránea está causando un hundimiento progresivo en la Región Metropolitana, un fenómeno invisible que amenaza nuestra infraestructura y seguridad hídrica.</p>
        </StorySection>

        <StorySection id="problema" imageUrl={radarImg}>
          <h2>La Evidencia: Antes y Después</h2>
          <p>Gracias a la tecnología de Radar de Apertura Sintética (SAR), podemos ver este cambio a lo largo de los años. Las siguientes imágenes satelitales revelan la deformación del terreno. <strong>Desliza para comparar.</strong></p>
          <ImageComparator before={sarBefore} after={sarAfter} />
        </StorySection>

        {/* SECCIÓN SOLUCIÓN - AHORA CON TARJETAS */}
        <StorySection id="final" imageUrl={terrenoImg}>
          <h2>Hacia una Solución Sostenible</h2>
          <p>
            Estos datos no son una sentencia, son una herramienta. Permiten a los municipios y a la comunidad tomar acciones informadas para garantizar un futuro resiliente.
          </p>
          {/* 2. Añadimos el contenedor y las tarjetas */}
          <div className="cards-container">
            <SolutionCard title="Monitoreo Continuo">
              Implementar un sistema de monitoreo SAR constante para anticipar zonas de riesgo y evaluar la efectividad de las medidas de mitigación en tiempo real.
            </SolutionCard>
            <SolutionCard title="Planificación Urbana Inteligente">
              Utilizar los mapas de hundimiento para guiar el desarrollo urbano, reforzando la infraestructura crítica y estableciendo normativas de construcción más seguras.
            </SolutionCard>
            <SolutionCard title="Conciencia Ciudadana">
              Crear plataformas de visualización abiertas como esta para educar al público sobre la importancia de la gestión hídrica y fomentar la participación comunitaria.
            </SolutionCard>
          </div>
        </StorySection>
        <Footer />
      </main>
    </div>
  );
}

export default App;