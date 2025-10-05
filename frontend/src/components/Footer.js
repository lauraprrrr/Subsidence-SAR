// src/components/Footer.js
import React from 'react';
import { FaGlobe } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>Subsidence-SAR [Laura y los Moracremas de Michimalongo] © {currentYear}</p>
      <p className="challenge-link">
        <FaGlobe />
        <a href="https://www.spaceappschallenge.org/" target="_blank" rel="noopener noreferrer">
          2025 NASA Space Apps Challenge
        </a>
      </p>
    </footer>
  );
};

export default Footer;