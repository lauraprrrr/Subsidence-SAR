// src/components/StorySection.js
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';
import './StorySection.css';

const StorySection = ({ id, children, imageUrl, onInView }) => {
  
  // 'inView' nos dice si el elemento está visible o no
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
    onChange: (inViewStatus) => {
      // Usamos el 'inViewStatus' que nos da el hook
      if (inViewStatus) {
        onInView(id);
      }
    },
  });

  const sectionStyle = {
    backgroundImage: `url(${imageUrl})`
  };

  return (
    <Element name={id}>
      <section 
        id={id} 
        ref={ref} 
        // ¡Restauramos la lógica de la clase 'is-visible'!
        className={`story-section ${inView ? 'is-visible' : ''}`}
        style={sectionStyle}
      >
        <div className="story-content">
          {children}
        </div>
      </section>
    </Element>
  );
};

export default StorySection;