import React from 'react';
import { motion } from 'framer-motion';
import './ScaloraClub.css';

const steps = [
  { num: "01", title: "Join Scalora", desc: "Step into an ecosystem built for execution. No theoretical lectures, just builders pushing boundaries.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" },
  { num: "02", title: "Learn IRDEM", desc: "Master our proprietary framework: Innovation, Research, Development, Entrepreneurship, and Management.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" },
  { num: "03", title: "Work on Project", desc: "Form a core team of complementary skills and start engineering real solutions from the ground up.", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" },
  { num: "04", title: "Build Portfolio", desc: "Create an undeniable body of work that proves your capability and execution speed to the industry.", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" },
  { num: "05", title: "Develop Skills", desc: "Leverage AI and modern technology stacks to think bigger and operate at a professional standard.", img: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2069&auto=format&fit=crop" },
  { num: "06", title: "Industry Ready", desc: "Pitch to investors and top tech leaders. Graduate not with a diploma, but with a scalable company.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" }
];

const ScaloraClub = () => {
  return (
    <section className="zigzag-section" id="students">
      <div className="zigzag-header">
        <h2 className="zigzag-main-title">The Student Journey</h2>
        <p className="zigzag-subtitle">A proven pipeline from absolute beginner to industry-ready founder.</p>
      </div>

      <div className="zigzag-container">
        {steps.map((step, idx) => (
          <div className={`zigzag-row ${idx % 2 === 1 ? 'row-reverse' : ''}`} key={idx}>
            <motion.div 
              className="zigzag-image-container"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src={step.img} alt={step.title} className="zigzag-image" />
              <div className="zigzag-image-overlay"></div>
            </motion.div>
            
            <motion.div 
              className="zigzag-text-container"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="zigzag-num">{step.num}</span>
              <h3 className="zigzag-title">{step.title}</h3>
              <p className="zigzag-desc">{step.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScaloraClub;
