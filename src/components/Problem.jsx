import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Problem.css';

const BrutalistBlock = ({ number, title, desc }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Massive parallax effect for the huge numbers
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="problem-brutalist-block">
      <motion.div style={{ y, opacity }} className="problem-brutalist-number">
        {number}
      </motion.div>
      <div className="problem-brutalist-content-wrapper">
        <motion.h3 
          className="problem-brutalist-title"
          initial={{ opacity: 0, rotateX: 90, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          style={{ transformOrigin: "bottom left" }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="problem-brutalist-desc"
          initial={{ opacity: 0, filter: "blur(10px)", x: -20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {desc}
        </motion.p>
      </div>
    </div>
  );
};

const Problem = () => {
  return (
    <section className="problem-brutalist-section">
      
      {/* Background Marquee */}
      <div className="problem-marquee-container">
        <motion.div 
          className="problem-marquee"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <span>THE CORE PROBLEM • THE CORE PROBLEM • THE CORE PROBLEM • THE CORE PROBLEM • </span>
          <span>THE CORE PROBLEM • THE CORE PROBLEM • THE CORE PROBLEM • THE CORE PROBLEM • </span>
        </motion.div>
      </div>

      <div className="problem-brutalist-container">
        
        <div className="problem-brutalist-header">
          <motion.h2 
            className="problem-brutalist-main-headline"
            initial={{ opacity: 0, x: -100, skewX: 10 }}
            whileInView={{ opacity: 1, x: 0, skewX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          >
            School is <br/>stuck in the past.
          </motion.h2>
          <motion.div 
            className="problem-brutalist-lead-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
          >
            <p className="problem-brutalist-lead">
              We are preparing kids for a world that literally doesn't exist anymore.
            </p>
          </motion.div>
        </div>

        <div className="problem-brutalist-list">
          <BrutalistBlock 
            number="01"
            title="15 Years Wasted on Tests."
            desc="Kids spend 15 years memorizing answers for exams, and almost no time actually learning how to think, solve problems, or build things." 
          />
          <BrutalistBlock 
            number="02"
            title="Book Smart, Street Blind."
            desc="We don't teach them how to lead teams or communicate. They know formulas, but not how to use them." 
          />
          <BrutalistBlock 
            number="03"
            title="Zero Real-World Experience."
            desc="Students graduate with shiny degrees but freeze up the second they face a real industry challenge." 
          />
          <BrutalistBlock 
            number="04"
            title="AI Just Broke the System."
            desc="Memorizing facts is useless now. AI can do that in seconds. If we don't teach students how to adapt and leverage technology, they'll be left completely behind." 
          />
        </div>

      </div>
    </section>
  );
};

export default Problem;
