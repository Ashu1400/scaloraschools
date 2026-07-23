import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonialsRow1 = [
  { role: "Student", name: "Ananya S.", text: "Scalora completely changed how I look at my future. I built a real product instead of just studying for exams." },
  { role: "Teacher", name: "Mr. Sharma", text: "The engagement level from students is unlike anything I've seen in my 15 years of teaching. They actually want to learn." },
  { role: "Principal", name: "Dr. Kapoor", text: "Implementing this ecosystem elevated our entire school's technological profile instantly. Parents are thrilled." },
  { role: "Parent", name: "Priya M.", text: "Seeing my daughter confidently pitch a business plan she coded herself was an incredible moment." },
];

const testimonialsRow2 = [
  { role: "Student", name: "Rohan T.", text: "The hackathons are intense but amazing. I've learned more here in a weekend than I did all semester." },
  { role: "Principal", name: "Sneha Patel", text: "This is the future of education. We are equipping our students with skills they actually use." },
  { role: "Teacher", name: "Ms. Iyer", text: "The IRDEM framework makes project-based learning incredibly structured and easy to facilitate." },
  { role: "Parent", name: "Arjun K.", text: "Finally, a program that prepares them for the real world instead of just standardized testing." },
];

// Duplicate for infinite scroll effect
const row1 = [...testimonialsRow1, ...testimonialsRow1];
const row2 = [...testimonialsRow2, ...testimonialsRow2];

const TestimonialCard = ({ item }) => (
  <div className="testimonial-card">
    <div className="testimonial-icon">
      <Quote size={20} className="text-blue" />
    </div>
    <p className="testimonial-text">"{item.text}"</p>
    <div className="testimonial-author">
      <span className="author-name">{item.name}</span>
      <span className="author-role">{item.role}</span>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-header-container">
        <motion.div 
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="testimonials-title">What They Say</h2>
          <p className="testimonials-subtitle">Don't just take our word for it. Hear from the ecosystem.</p>
        </motion.div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-container">
          <div className="marquee-track track-left">
            {row1.map((item, idx) => (
              <TestimonialCard key={idx} item={item} />
            ))}
          </div>
        </div>

        <div className="marquee-container">
          <div className="marquee-track track-right">
            {row2.map((item, idx) => (
              <TestimonialCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
