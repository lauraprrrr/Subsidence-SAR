// src/components/SolutionCard.js
import React from 'react';
import './SolutionCard.css';

const SolutionCard = ({ title, children }) => {
  return (
    <div className="solution-card">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
};

export default SolutionCard;