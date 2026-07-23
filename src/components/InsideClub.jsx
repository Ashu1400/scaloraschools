import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './InsideClub.css';

const timelineSteps = [
  { id: "01", title: "Seminar Day 1", desc: "Introduction to the ecosystem and mindset shift." },
  { id: "02", title: "Seminar Day 2", desc: "Deep dive into problem solving and ideation." },
  { id: "03", title: "6-Month Foundation Work", desc: "Intensive training in modern tech stacks and execution." },
  { id: "04", title: "Projects", desc: "Building real-world products from the ground up." },
  { id: "05", title: "Hackathons", desc: "High-pressure, rapid execution challenges to test skills." },
  { id: "06", title: "Industry Sessions", desc: "Mentorship and networking with top tech leaders." },
  { id: "07", title: "Demo Day", desc: "Pitching your scalable startup to investors and peers." }
];

const InsideClub = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="inside-club-section" id="ecosystem">
      <div className="inside-club-container">
        
        <motion.div 
          className="inside-club-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="inside-club-title">What happens inside a Scalora Club</h2>
          <p className="inside-club-subtitle">
            The definitive blueprint for transforming students into founders.
          </p>
        </motion.div>

        <div className="timeline-wrapper" ref={containerRef}>
          {/* Animated central line connecting the nodes */}
          <div className="timeline-line-background"></div>
          <motion.div className="timeline-line-progress" style={{ height: lineHeight }}></motion.div>

          <div className="timeline-nodes">
            {timelineSteps.map((step, index) => (
              <div className={`timeline-node ${index % 2 === 0 ? 'node-left' : 'node-right'}`} key={index}>
                
                {/* The dot on the timeline */}
                <motion.div 
                  className="timeline-dot"
                  initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                  whileInView={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                ></motion.div>

                {/* The content card */}
                <motion.div 
                  className="timeline-content-card"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="timeline-step-num">{step.id}</span>
                  <h3 className="timeline-step-title">{step.title}</h3>
                  <p className="timeline-step-desc">{step.desc}</p>
                </motion.div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default InsideClub;
