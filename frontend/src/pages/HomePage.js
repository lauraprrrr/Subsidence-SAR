import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import '../App.css';
import Header from '../components/Header';
import StorySection from '../components/StorySection';
import ImageComparator from '../components/ImageComparator';
import SolutionCard from '../components/SolutionCard'; 

import santiagoImg from '../assets/santiago.jpeg';
import radarImg from '../assets/radar.jpg';
import terrenoImg from '../assets/terreno.jpg';
import sarBefore from '../assets/sar_2020.png'; 
import sarAfter from '../assets/sar_2025.jpeg';
import subsidenciaImg from '../assets/subsidencia.png';
import extraccionImg from '../assets/extraccion.png';
import hidricaImg from '../assets/hidrica.jpg';
import hidrica2Img from '../assets/hidrica2.jpg';
import DGAImg from '../assets/DGA.jpg';
import DGA2Img from '../assets/DGA2.jpg';

import Footer from '../components/Footer'; 
import { FaChevronDown } from 'react-icons/fa'; 




function HomePage() {
  const [activeLink, setActiveLink] = useState('intro-1');

  return (
    <>
      <Header activeLink={activeLink}/>
      <main className="story-container">

        {}
        <StorySection id="intro-1" imageUrl={santiagoImg} onInView={setActiveLink}>
          <h2>El Hundimiento Silencioso de Santiago</h2>
          <p>Bajo nuestros pies, la tierra cede. Un fenómeno invisible amenaza nuestra infraestructura y seguridad hídrica, impulsado por una causa que a menudo ignoramos.</p>
          <Link to="/mapa" className="btn-primary">Ver el Mapa de Hundimiento</Link>
          
        </StorySection>
        <div className="scroll-indicator"><FaChevronDown /></div>

        <StorySection id="intro-2" imageUrl={subsidenciaImg} onInView={setActiveLink}>
          <h2>¿Qué es la Subsidencia?</h2>
          <p>La subsidencia es el hundimiento progresivo de la superficie terrestre. En la Región Metropolitana, la causa principal es la sobreextracción de agua subterránea, que provoca la compactación irreversible de los acuíferos.</p>
        </StorySection>

        <StorySection id="intro-3" imageUrl={DGAImg} onInView={setActiveLink}>
          <h2>El Rol de la Dirección General de Aguas</h2>
          <div className="cards-container">
            <SolutionCard title="Gestión del Agua">Su rol principal es administrar los recursos hídricos de Chile, otorgando Derechos de Aprovechamiento de Aguas (DAA) según el Código de Aguas.</SolutionCard>
            <SolutionCard title="Fiscalización">Tiene la potestad de multar e incluso ordenar el cierre de pozos que operen sin derechos o que extraigan más agua de la permitida.</SolutionCard>
          </div>
        </StorySection>

        {}
        <StorySection id="problema-1" imageUrl={extraccionImg} onInView={setActiveLink}>
          <h2>Sobreextracción de Aguas Subterráneas</h2>
          <p>El problema central radica en la extracción de agua a un ritmo mayor que el de la recarga natural. Esto agota las reservas y causa daños estructurales en los acuíferos.</p>
          <div className="cards-container">
            <SolutionCard title="El Mecanismo Físico">El agua en los acuíferos ejerce una presión que sostiene el terreno. Al extraerla, esta presión disminuye y las capas de sedimento se compactan por el peso.</SolutionCard>
            <SolutionCard title="La 'Firma' del Hundimiento">La subsidencia por esta causa no es uniforme. Crea "conos" de hundimiento concentrados sobre las zonas de mayor bombeo, un patrón que SAR puede detectar.</SolutionCard>
          </div>
        </StorySection>

        <StorySection id="problema-2" imageUrl={hidricaImg} onInView={setActiveLink}>
          <h2>La Seguridad Hídrica en Juego</h2>
          <p>Al compactarse el suelo, se reduce permanentemente la capacidad de los acuíferos para almacenar agua. Esto no solo agrava la escasez en tiempos de sequía, sino que amenaza la disponibilidad del recurso para las futuras generaciones.</p>
        </StorySection>

        <StorySection id="problema-3" imageUrl={radarImg} onInView={setActiveLink}>
          <h2>La Evidencia: Antes y Después</h2>
          <p>La tecnología SAR nos permite cuantificar este problema. Las imágenes satelitales no mienten: muestran las cicatrices que la extracción de agua deja en el terreno a lo largo de los años. <strong>Desliza para comparar.</strong></p>
          <ImageComparator before={sarBefore} after={sarAfter} />
        </StorySection>

        {}
        <StorySection id="solucion-1" imageUrl={terrenoImg} onInView={setActiveLink}>
          <h2>Soluciones Actuales: ¿Suficientes?</h2>
          <p>Los métodos actuales de monitoreo y fiscalización son vitales, pero a menudo se enfrentan a desafíos de escala y oportunidad.</p>
          <div className="cards-container">
            <SolutionCard title="Fiscalización Reactiva">El modelo actual depende de denuncias o inspecciones lentas y costosas. Para cuando se detecta un problema, el daño al acuífero ya puede ser significativo.</SolutionCard>
            <SolutionCard title="Piezometría: El Termómetro">Mide con precisión el nivel del agua en un solo punto. Es una medición directa, pero sufre de "ceguera espacial": no puede descubrir nuevos focos de problema.</SolutionCard>
            <SolutionCard title="Cobertura Limitada">Monitorear un valle entero con piezómetros requeriría una red masiva y de altísimo costo, dejando inevitablemente puntos ciegos.</SolutionCard>
          </div>
        </StorySection>

        <StorySection id="solucion-2" imageUrl={hidrica2Img} onInView={setActiveLink}>
          <h2>Nuestra Propuesta: Análisis de Datos SAR</h2>
          <p>Proponemos el uso de análisis interferométrico de datos SAR como herramienta principal de monitoreo, transformando la fiscalización en una tarea proactiva.</p>
          <div className="cards-container">
            <SolutionCard title="InSAR: El Satélite Espía">En lugar de medir el agua, InSAR mide su consecuencia directa: el hundimiento del terreno. Ofrece una visión global y completa desde el espacio.</SolutionCard>
            <SolutionCard title="Visión de Águila">Una sola imagen satelital puede cubrir miles de kilómetros cuadrados, monitoreando valles enteros a la vez y eliminando los puntos ciegos.</SolutionCard>
          </div>
        </StorySection>

        <StorySection id="solucion-3" imageUrl={DGA2Img} onInView={setActiveLink}>
          <h2>Monitoreo a Gran Escala y en Tiempo Real</h2>
          <p>La combinación de tecnologías es la clave para una gestión hídrica verdaderamente moderna y efectiva, protegiendo nuestros recursos para el futuro.</p>
           <div className="cards-container">
            <SolutionCard title="Hacia la Gestión Proactiva">SAR permite a la DGA enfocar sus recursos de fiscalización de manera eficiente, actuando sobre las "zonas calientes" de hundimiento antes de que el daño sea crítico.</SolutionCard>
            <SolutionCard title="La Sinergia Perfecta">El sistema ideal usa ambas tecnologías: InSAR para la detección a gran escala ("¿Dónde?") y la piezometría para la validación en terreno ("¿Qué tan grave?").</SolutionCard>
          </div>
        </StorySection>

      </main>
      <Footer />
    </>
  );
}

export default HomePage;