import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import './Manifesto.css';

const manifestoData = [
  {
    menuTitle: "Experience",
    titleLine1: "Real",
    titleLine2: "Skills",
    description: "Real learning happens when students build, launch, and lead real projects. We prioritize hands-on experience over textbook memorization.",
    stats: []
  },
  {
    menuTitle: "Leadership",
    titleLine1: "Future",
    titleLine2: "Leaders",
    description: "True leadership isn't taught in a classroom. It's forged by taking charge of teams, navigating real-world obstacles, and making the tough calls.",
    stats: []
  },
  {
    menuTitle: "Capability",
    titleLine1: "Endless",
    titleLine2: "Potential",
    description: "When empowered with the right tools and industry exposure, students are fully capable of building impactful startups and leading global organizations.",
    stats: []
  }
];

const titleVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.15, staggerDirection: -1 }
  }
};

const wordVariant = {
  hidden: { 
    y: "110%", 
    opacity: 0, 
    filter: "blur(10px)"
  },
  show: { 
    y: "0%", 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    y: "-80%", 
    opacity: 0, 
    filter: "blur(10px)",
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } 
  }
};

const Manifesto = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Crazy massive background scaling and rotation
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.8, 3.5]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveIndex(0);
    } else if (latest >= 0.33 && latest < 0.66) {
      setActiveIndex(1);
    } else if (latest >= 0.66) {
      setActiveIndex(2);
    }
  });

  return (
    <div ref={containerRef} className="editorial-scroll-container">
      <section className="editorial-section">
      <div className="editorial-bg-image"></div>
      
      {/* Crazy Premium Scroll-Reactive Background */}
      <div className="editorial-bg-animation">
        <motion.div 
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120vw',
            height: '120vw',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.08) 20%, rgba(0,0,0,0) 50%, rgba(255,255,255,0.03) 80%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            x: '-50%',
            y: '-50%',
            scale: bgScale,
            rotate: bgRotate
          }}
        />
        <motion.div 
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80vw',
            height: '80vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 60%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            x: '-50%',
            y: '-50%',
            scale: glowScale
          }}
        />
      </div>

      <div className="editorial-container">
        
        {/* Left Column */}
        <div className="editorial-left">
          <div className="editorial-menu">
            {manifestoData.map((item, index) => (
              <button 
                key={index} 
                className={`menu-btn ${activeIndex === index ? 'active' : ''}`}
                onClick={() => {}} // Disabled click since it's scroll driven
              >
                {item.menuTitle}
              </button>
            ))}
          </div>
          
          <div className="editorial-desc-block">
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeIndex}
                className="editorial-desc"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {manifestoData[activeIndex].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Main Center Area */}
        <div className="editorial-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              variants={titleVariant}
              initial="hidden"
              animate="show"
              exit="exit"
              className="editorial-title-wrapper"
              style={{ perspective: 2000 }}
            >
              <div style={{ overflow: 'hidden', paddingBottom: '10px', paddingTop: '10px' }}>
                <motion.h2 variants={wordVariant} className="editorial-title line-1">
                  {manifestoData[activeIndex].titleLine1}
                </motion.h2>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '10px', paddingTop: '10px' }}>
                <motion.h2 variants={wordVariant} className="editorial-title line-2">
                  {manifestoData[activeIndex].titleLine2}
                </motion.h2>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>
    </section>
    </div>
  );
};

export default Manifesto;
