// src/App.js

import './App.css';
import Header from './components/Header';
import StorySection from './components/StorySection';
import ImageComparator from './components/ImageComparator'; // 1. Importa el nuevo componente

// Importamos las imágenes de fondo
import santiagoImg from './assets/santiago.jpeg'; // Teniendo en cuenta tu .jpeg
import radarImg from './assets/radar.jpg';
import terrenoImg from './assets/terreno.jpg';

// 2. Importamos las imágenes para el comparador
import sarBefore from './assets/sar_2020.png'; // Reemplaza con tus nombres de archivo
import sarAfter from './assets/sar_2025.jpeg';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="story-container">
        {/* SECCIÓN INICIO - ID 'intro' */}
        <StorySection id="intro" imageUrl={santiagoImg}>
          <h2>El Hundimiento Silencioso de Santiago</h2>
          <p>
            Bajo nuestros pies, la tierra cede. La extracción insostenible de agua subterránea
            está causando un hundimiento progresivo en la Región Metropolitana, un fenómeno
            invisible que amenaza nuestra infraestructura y seguridad hídrica.
          </p>
        </StorySection>

        {/* SECCIÓN PROBLEMA - ID 'problema' */}
        <StorySection id="problema" imageUrl={radarImg}>
          <h2>La Evidencia: Antes y Después</h2>
          <p>
            Gracias a la tecnología de Radar de Apertura Sintética (SAR), podemos ver este cambio
            a lo largo de los años. Las siguientes imágenes satelitales revelan la deformación
            del terreno. **Desliza para comparar.**
          </p>
          {/* 3. Añadimos el componente comparador aquí */}
          <ImageComparator before={sarBefore} after={sarAfter} />
        </StorySection>

        {/* SECCIÓN SOLUCIÓN - ID 'solucion' */}
        <StorySection id="final" imageUrl={terrenoImg}>
          <h2>Hacia una Solución Sostenible</h2>
          <p>
            Estos datos no son una sentencia, son una herramienta. Permiten a los municipios
            identificar zonas de alto riesgo, planificar un desarrollo urbano más seguro y
            promover políticas de gestión del agua que garanticen el futuro de nuestra región.
            La concientización es el primer paso.
          </p>
        </StorySection>
      </main>
    </div>
  );
}

// 4. Actualizamos el id de la última sección para que coincida con el Header
// (Lo hice arriba, pero asegúrate que tu última StorySection tenga id="final" si tu header dice "Solución" con href="#final")
// Corrijo: Tu header dice "Solución" con href="#final", así que el id="final" es correcto.
export default App;