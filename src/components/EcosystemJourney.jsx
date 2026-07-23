import React from 'react';
import { motion } from 'framer-motion';
import './EcosystemJourney.css';

const steps = [
  { title: "The Foundation", desc: "Start in school with a solid academic base." },
  { title: "Exploration", desc: "Join student clubs and attend hands-on workshops." },
  { title: "Challenges", desc: "Participate in global competitions to test your skills." },
  { title: "Influence", desc: "Become an ambassador and shape the community." },
  { title: "Leadership", desc: "Develop real-world leadership and management skills." },
  { title: "Exposure", desc: "Gain industry exposure and network with professionals." },
  { title: "The Future", desc: "Access unparalleled future opportunities for growth." }
];

const EcosystemJourney = () => {
  return (
    <section className="journey-section section-padding" id="ecosystem">
      <div className="container">
        <motion.div 
          className="journey-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-title">The Ecosystem Journey</h2>
          <p className="section-subtitle">
            From the classroom to the real world. We provide the stepping stones for students to discover their strengths and unlock new possibilities.
          </p>
        </motion.div>
        
        <div className="timeline">
          {steps.map((step, index) => (
            <motion.div 
              className="timeline-item" 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="timeline-node"></div>
              <div className="timeline-content glass-card">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemJourney;
