// src/App.js

import './App.css';
import Header from './components/Header'; // La ruta está bien así si el archivo es Header.js
import StorySection from './components/StorySection'; // 1. Importamos el nuevo componente

function App() {
  return (
    <div className="App">
      <Header />

      {/* Usamos <main> por semántica para el contenido principal */}
      <main className="story-container">
        {/* 2. Usamos nuestro componente StorySection para cada parte de la historia */}
        
        <StorySection id="intro">
          <h2>El Origen</h2>
          <p>
            Hace miles de millones de años, en un rincón tranquilo de la galaxia,
            una nube de polvo y gas comenzó a colapsar sobre sí misma. Este fue
            el humilde comienzo de nuestro Sol y, con él, nuestro planeta.
          </p>
        </StorySection>

        <StorySection id="capitulo1">
          <h2>El Despertar de la Vida</h2>
          <p>
            En los océanos primigenios, bajo un cielo anaranjado, las primeras moléculas
            complejas se unieron. De una chispa química surgió la vida, un fenómeno
            tenaz que cambiaría la faz de la Tierra para siempre.
          </p>
        </StorySection>

        <StorySection id="final">
          <h2>Un Punto Azul Pálido</h2>
          <p>
            Hoy, este mundo bulle de diversidad. Desde las profundidades abisales hasta
            las cumbres más altas, la vida ha conquistado cada rincón, recordándonos
            la fragilidad y la belleza de nuestro hogar en el cosmos.
          </p>
        </StorySection>

      </main>
    </div>
  );
}

export default App;