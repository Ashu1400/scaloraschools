import React from 'react';
import { motion } from 'framer-motion';
import './OurProgramsStyles.css';

const programs = [
  { 
    title: "Bootcamps", 
    desc: "Intense, focused technical sprints.", 
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    title: "AI Sessions", 
    desc: "Cutting-edge artificial intelligence training.", 
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop" 
  },
  { 
    title: "Workshops", 
    desc: "Hands-on, interactive skill-building sessions led by industry experts.", 
    img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    title: "Competitions", 
    desc: "Global hackathons and pitch days.", 
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" 
  },
  { 
    title: "Industry Visits", 
    desc: "Exclusive access to top tech companies.", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
  }
];

const OurPrograms = () => {
  return (
    <section className="programs-bento-section" id="programs">
      <div className="programs-bento-header">
        <h2 className="programs-bento-main-title">Our Programs</h2>
        <p className="programs-bento-subtitle">A comprehensive suite of experiences designed to build the founders of tomorrow.</p>
      </div>

      <div className="programs-bento-container">
        
        {/* Flagship Hero Card  */}
        <motion.div 
          className="bento-hero-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop" alt="Scalora Schools" className="bento-bg-img" />
          <div className="bento-overlay"></div>
          <div className="bento-content">
            <span className="bento-badge">FLAGSHIP PROGRAM</span>
            <h3 className="bento-hero-title">Scalora Schools</h3>
            <p className="bento-hero-desc">Our flagship program partnering directly with institutions to bring elite tech clubs and leadership opportunities to campuses worldwide.</p>
          </div>
        </motion.div>

        {/* 5-Card Bento Grid */}
        <div className="bento-grid-5">
          {programs.map((prog, idx) => (
            <motion.div 
              key={idx} 
              className="bento-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={prog.img} alt={prog.title} className="bento-bg-img" />
              <div className="bento-overlay"></div>
              <div className="bento-content">
                <h4 className="bento-card-title">{prog.title}</h4>
                <p className="bento-card-desc">{prog.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurPrograms;
