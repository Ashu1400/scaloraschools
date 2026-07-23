import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './OurProjectsStyles.css';

const projects = [
  { 
    title: 'Edufolio', 
    shortDesc: 'Student Portfolio Platform',
    longDesc: 'A centralized digital portfolio designed for students to showcase their academic achievements, extracurriculars, and personal projects to tech recruiters.',
    students: 'Pratham Bhadauria',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'
  },
  { 
    title: 'Cargo Pool', 
    shortDesc: 'Logistics & Cargo Sharing',
    longDesc: 'A smart logistics marketplace that optimizes supply chain routes by allowing businesses to share unused truck cargo space in real-time.',
    students: 'Shourya Tyagi',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'MediCare', 
    shortDesc: 'Unified Medical Data Platform',
    longDesc: 'A secure, unified medical records platform that synchronizes patient data across different healthcare providers for seamless, instant care.',
    students: 'Anushka & Radhe',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop' // Fixed broken image
  },
  { 
    title: 'Scholarship Match', 
    shortDesc: 'AI Recommendation System',
    longDesc: 'An AI-powered engine that analyzes a student\'s academic profile to instantly match them with millions in available, highly-relevant scholarships.',
    students: 'Vaishnavi, Ayushman Singh',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'EduStay', 
    shortDesc: 'Verified Student Housing',
    longDesc: 'An end-to-end housing platform connecting university students with safe, affordable, and fully-vetted accommodations near their campus.',
    students: 'Ayush & Anmol',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop'
  }
];

// Duplicate to allow for seamless infinite native scrolling
const endlessProjects = [...projects, ...projects, ...projects];

const OurProjects = () => {
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  
  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);

  useEffect(() => {
    let animationFrameId;
    
    const scroll = () => {
      // Only auto-scroll if the user isn't hovering, touching, or dragging
      if (scrollRef.current && !isInteracting && !isDragging) {
        scrollRef.current.scrollLeft += 0.6; // Much slower auto-scroll speed
        
        // Seamless loop reset when it reaches 1/3 of the way through the tripled array
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 3) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e) => {
    setIsInteracting(true);
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setInitialScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsInteracting(false);
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = initialScrollLeft - walk;
  };

  return (
    <section className="our-projects-section" id="projects">
      <div className="projects-container">
        
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="projects-main-title">Our Projects</h2>
          <p className="projects-subtitle">
            These are just a few of the projects built entirely by our students. <strong>Many more are live right now.</strong>
          </p>
        </motion.div>

        {/* Native scroll container for perfect mobile swiping + JS auto-scroll + Desktop Dragging */}
        <div 
          ref={scrollRef} 
          className="native-carousel-container" 
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => {
            // Slight delay before auto-scroll resumes after touching
            setTimeout(() => setIsInteracting(false), 2000);
          }}
        >
          <div className="carousel-inner-native">
            {endlessProjects.map((project, index) => (
              <div key={index} className="carousel-card native-card">
                <img src={project.img} alt={project.title} className="project-bg-img" />
                <div className="project-overlay"></div>
                
                {/* Default state content */}
                <div className="project-content-default">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-short-desc">{project.shortDesc}</p>
                </div>
                
                {/* Hover state details panel */}
                <div className="project-details-panel">
                  <div className="details-header">
                    <h3 className="project-title-small">{project.title}</h3>
                  </div>
                  <p className="project-long-desc">{project.longDesc}</p>
                  
                  <div className="project-authors">
                    <span className="author-label">Built by</span>
                    <span className="author-names">{project.students}</span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default OurProjects;
