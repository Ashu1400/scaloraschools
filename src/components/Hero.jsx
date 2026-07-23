import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay"></div>
      
      <div className="hero-container">
        
        <div className="hero-title-wrapper">
          <motion.h1 
            className="hero-massive-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Redefine<br />
            your school
          </motion.h1>
        </div>

        {/* Bottom Right: Subtitle */}
        <motion.div 
          className="hero-bottom-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="hero-es-subtitle">
            Partner with Scalora to bring a real-world tech ecosystem to your campus and empower your students with industry-ready skills.
          </p>
          <Link to="/join" className="hero-es-link" style={{ textDecoration: 'none' }}>
            Join the ecosystem
          </Link>
        </motion.div>

        {/* Bottom Left: Scroll */}
        <motion.div 
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Scroll
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
