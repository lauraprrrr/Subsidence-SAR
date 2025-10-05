// src/components/StorySection.js

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll'; // 1. Importa Element
import './StorySection.css';

// 1. Añadimos "imageUrl" a las props que recibimos
const StorySection = ({ id, children, imageUrl }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // 2. Creamos un objeto de estilo para el fondo
  const sectionStyle = {
    backgroundImage: `url(${imageUrl})`
  };

  return (
    <Element name={id}> {/* 2. Usamos Element para permitir el scroll */}
    <section 
      id={id} 
      ref={ref} 
      className={`story-section ${inView ? 'is-visible' : ''}`}
      style={sectionStyle} // 3. Aplicamos el estilo aquí
    >
      <div className="story-content">
        {children}
      </div>
    </section>
    </Element>
  );
};

export default StorySection;