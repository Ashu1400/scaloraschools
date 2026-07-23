import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Flag, Building, Users, MapPin, Sparkles } from 'lucide-react';
import './OurJourney.css';

const journeyNodes = [
  { year: "2021", title: "Founded", icon: Flag, desc: "The vision was born. A plan to disrupt traditional schooling with real-world engineering." },
  { year: "2022", title: "First Schools", icon: Building, desc: "Successfully partnered with our very first pilot schools, integrating our clubs into their curriculum." },
  { year: "2023", title: "100 Students", icon: Users, desc: "Crossed the milestone of 100 active students actively building and pitching products." },
  { year: "2024", title: "10 Schools", icon: MapPin, desc: "Scaled our operations to 10 distinct schools across the region, proving our framework works at scale." },
  { year: "Future", title: "Future Vision", icon: Sparkles, desc: "Expanding globally. Transforming a million students from exam-takers into actual founders." }
];

const JourneyNode = ({ node, index }) => {
  const Icon = node.icon;
  const isEven = index % 2 === 0;

  return (
    <div className={`journey-node-container ${isEven ? 'left' : 'right'}`}>
      
      <div className="journey-node-spacer"></div>

      <div className="journey-node-center">
        <motion.div 
          className="journey-node-dot"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        >
          <div className="journey-node-dot-inner"></div>
        </motion.div>
      </div>

      <motion.div 
        className="journey-node-content-wrapper"
        initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      >
        <div className="journey-path-content">
          <div className="journey-year-badge">{node.year}</div>
          <div className="journey-path-icon">
            <Icon size={28} strokeWidth={1.5} />
          </div>
          <h3 className="journey-path-title">{node.title}</h3>
          <p className="journey-path-desc">{node.desc}</p>
        </div>
      </motion.div>

    </div>
  );
};

const OurJourney = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="our-journey-section" ref={containerRef}>
      <div className="journey-path-container">
        
        <motion.div 
          className="journey-path-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="journey-path-main-title">Our Journey</h2>
          <p className="journey-path-subtitle">From a simple idea to a thriving ecosystem.</p>
        </motion.div>

        <div className="journey-timeline-wrapper">
          {/* Background Line */}
          <div className="journey-timeline-line-bg"></div>
          
          {/* Animated Fill Line */}
          <motion.div 
            className="journey-timeline-line-fill"
            style={{ scaleY, originY: 0 }}
          ></motion.div>

          <div className="journey-nodes-list">
            {journeyNodes.map((node, index) => (
              <JourneyNode 
                key={index}
                node={node}
                index={index}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurJourney;
