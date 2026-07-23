import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import aboutImg from '../assets/aboutImg.jpeg';
import aboutImg2 from '../assets/aboutImg2.png';
import './About.css';

const About = () => {
  return (
    <section className="about-section-redesigned" id="about">
      <div className="about-container-redesigned">
        
        <motion.div 
          className="about-header-redesigned"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="about-title-redesigned">
            About Us
            <Sparkles className="title-icon" size={32} />
          </h2>
        </motion.div>

        <div className="about-split-layout">
          <motion.div 
            className="about-images-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <div className="about-image-primary">
              <img src={aboutImg} alt="About Scalora Schools" className="about-image" />
              <div className="about-image-overlay"></div>
            </div>
            <div className="about-image-secondary">
              <img src={aboutImg2} alt="Scalora Ecosystem" className="about-image" />
              <div className="about-image-overlay"></div>
            </div>
          </motion.div>

          <motion.div 
            className="about-content-redesigned"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="about-glow-wrapper">
              <div className="about-glass-panel">
                <div className="quote-mark">"</div>
                <p className="about-text-blueesigned">
                  Scalora Schools is building a <span className="highlight-text">student ecosystem</span> that extends learning beyond the classroom. 
                  Through student clubs, workshops, competitions, ambassador programs, leadership initiatives, 
                  and industry exposure opportunities, we help students discover their strengths, develop <span className="highlight-text">future-ready skills</span>, 
                  gain real-world experience, and unlock new possibilities for growth.
                </p>
                <p className="about-text-blueesigned">
                  Our mission is to transform schools into environments where students do not just learn subjects, 
                  but build confidence, leadership, creativity, problem-solving abilities, and the mindset needed 
                  to <span className="highlight-text">thrive in a rapidly changing world</span>. From classrooms to opportunities, Scalora Schools empowers 
                  the next generation of leaders, builders, innovators, and changemakers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
