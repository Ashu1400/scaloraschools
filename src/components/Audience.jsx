import React from 'react';
import { motion } from 'framer-motion';
import './Audience.css';
import { Users, GraduationCap, Building } from 'lucide-react';

const Audience = () => {
  return (
    <section className="audience-section section-padding">
      <div className="container">
        <motion.div 
          className="audience-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-title">Built for the Ecosystem</h2>
          <p className="section-subtitle">
            Scalora Schools connects students, parents, and educators to build a comprehensive platform for growth.
          </p>
        </motion.div>

        <div className="audience-grid">
          <motion.div 
            className="audience-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
          >
            <div className="icon-wrapper">
              <Building size={32} />
            </div>
            <h3>For Schools</h3>
            <p>Partner with us to bring elite clubs, competitions, and leadership opportunities directly to your campus.</p>
          </motion.div>

          <motion.div 
            className="audience-card glass-card active-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <div className="icon-wrapper">
              <GraduationCap size={32} />
            </div>
            <h3>For Students <span className="badge">9th-12th</span></h3>
            <p>Unlock your potential beyond academics. Discover your passions, build real skills, and connect with industry leaders.</p>
          </motion.div>

          <motion.div 
            className="audience-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
          >
            <div className="icon-wrapper">
              <Users size={32} />
            </div>
            <h3>For Parents</h3>
            <p>Provide your child with the real-world experience and future-ready skills they need to thrive in a changing world.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Audience;
