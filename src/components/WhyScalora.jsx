import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './WhyScalora.css';

const WhyScalora = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const pillars = [
    { num: "01", title: "Learn by Building", desc: "We don't do theoretical lectures. Students learn entirely by executing real-world projects and solving actual problems." },
    { num: "02", title: "AI Integrated", desc: "Our curriculum doesn't just tolerate AI—it requires it. Students use industry-standard tools to work faster and think bigger." },
    { num: "03", title: "Industry Mindset", desc: "Schools teach compliance. We teach execution. Our students are expected to operate at the standard of modern professionals." }
  ];

  const irdem = [
    { letter: "I", title: "Innovation", desc: "Identifying genuine problems that demand better solutions." },
    { letter: "R", title: "Research", desc: "Deep market analysis and rigorous data validation." },
    { letter: "D", title: "Development", desc: "Engineering the product from the ground up." },
    { letter: "E", title: "Entrepreneurship", desc: "Taking the product to market and acquiring users." },
    { letter: "M", title: "Management", desc: "Leading the team and structuring for long-term scale." }
  ];

  return (
    <section className="why-scalora-redesign" id="schools">
      
      {/* Massive Intro Title in the negative space */}
      <div className="why-scalora-intro">
        <motion.h2 
          className="why-scalora-massive-title"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05, y: 30 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Why Scalora Schools<span className="text-blue">.</span>
        </motion.h2>
      </div>

      {/* Part 1: Sticky Split Layout */}
      <div className="sticky-split-container">
        {/* Left Side: Sticky Image */}
        <div className="sticky-left">
          <div className="sticky-image-wrapper">
             <div className="sticky-image-overlay"></div>
             <div className="sticky-text-content">
                <h2 className="sticky-header">Education built for <span className="text-blue">reality.</span></h2>
             </div>
          </div>
        </div>
        
        {/* Right Side: Scrolling Pillars */}
        <div className="scrolling-right">
          <div className="pillars-container">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx} 
                className="pillar-block"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="pillar-num">{pillar.num}</div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Part 2: IRDEM Accordion */}
      <div className="irdem-section">
        <div className="irdem-header-block">
          <h2 className="irdem-main-title">The IRDEM Framework</h2>
          <p className="irdem-main-subtitle">The proprietary step-by-step methodology powering the entire Scalora ecosystem.</p>
        </div>
        
        <div className="accordion-container">
          {irdem.map((item, idx) => (
            <div 
              key={idx} 
              className={`accordion-row ${activeAccordion === idx ? 'active' : ''}`}
              onMouseEnter={() => setActiveAccordion(idx)}
            >
              <div className="accordion-letter">{item.letter}</div>
              <div className="accordion-content">
                 <h3 className="accordion-title">{item.title}</h3>
                 <div className="accordion-desc-wrapper">
                    <p className="accordion-desc">{item.desc}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyScalora;
