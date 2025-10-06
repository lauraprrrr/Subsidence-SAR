import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';
import './StorySection.css';

const StorySection = ({ id, children, imageUrl, onInView }) => {
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
    onChange: (inViewStatus) => {
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