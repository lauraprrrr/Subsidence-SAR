// src/components/StorySection.js

import React from 'react';
import './StorySection.css';

// Recibimos "id" y "children" como props.
// "children" es el contenido que ponemos DENTRO de la etiqueta del componente.
const StorySection = ({ id, children }) => {
  return (
    // Usamos el id para la navegación interna de la página
    <section id={id} className="story-section">
      <div className="story-content">
        {children}
      </div>
    </section>
  );
};

export default StorySection;