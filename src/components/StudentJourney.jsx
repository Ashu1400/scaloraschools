import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, BookOpen, PenTool, Image as ImageIcon, TrendingUp, Award, ArrowRight } from 'lucide-react';
import './StudentJourney.css';

const JourneyCard = ({ icon: Icon, title, index, isLastInRow }) => {
  return (
    <div className="journey-card-wrapper">
      <motion.div 
        className="journey-grid-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -5, borderColor: "rgba(228, 22, 19, 0.4)" }}
      >
        <div className="journey-card-header">
          <div className="journey-card-icon">
            <Icon size={24} strokeWidth={2} />
          </div>
          <span className="journey-card-number">0{index + 1}</span>
        </div>
        <h3 className="journey-card-title">{title}</h3>
      </motion.div>
      
      {/* Arrow between cards (hidden on mobile, hidden on the last item of a row) */}
      {!isLastInRow && (
        <motion.div 
          className="journey-arrow-connector"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        >
          <ArrowRight size={24} className="text-blue" />
        </motion.div>
      )}
    </div>
  );
};

const StudentJourney = () => {
  const journeySteps = [
    { title: "Join Scalora", icon: LogIn },
    { title: "Learn IRDEM", icon: BookOpen },
    { title: "Work on Project", icon: PenTool },
    { title: "Build Portfolio", icon: ImageIcon },
    { title: "Develop Skills", icon: TrendingUp },
    { title: "Industry Ready", icon: Award }
  ];

  return (
    <section className="student-journey-grid-section">
      <div className="journey-grid-container">
        
        <motion.div 
          className="journey-grid-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="journey-grid-main-title">The Student Journey</h2>
          <p className="journey-grid-subtitle">A proven pipeline from absolute beginner to industry-ready founder.</p>
        </motion.div>

        <div className="journey-pipeline-grid">
          {journeySteps.map((step, index) => (
            <JourneyCard 
              key={index}
              index={index}
              title={step.title}
              icon={step.icon}
              // True for the 3rd and 6th items (index 2 and 5) in a 3-column desktop layout
              isLastInRow={(index + 1) % 3 === 0 || index === journeySteps.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StudentJourney;
