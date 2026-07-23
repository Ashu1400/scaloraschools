import React from 'react';
import { motion } from 'framer-motion';
import './Intro.css';

const Intro = () => {
  return (
    <section className="intro-section section-padding">
      <div className="container intro-container">
        <motion.div 
          className="intro-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="blue-dot">•</span> About Scalora Schools
        </motion.div>
        
        <motion.h2 
          className="intro-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          A student ecosystem that extends learning beyond the classroom. We build builders, innovators, and changemakers.
        </motion.h2>
      </div>
    </section>
  );
};

export default Intro;
