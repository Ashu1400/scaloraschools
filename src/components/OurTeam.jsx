import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Link as LinkIcon, MessageCircle, X } from 'lucide-react';
import palchilImg from '../assets/palchil.jpeg';
import radheImg from '../assets/Radhe.jpeg';
import udyanshImg from '../assets/udyansh.jpeg';
import ayushImg from '../assets/Ayush.jpeg';
import vaishnaviImg from '../assets/Vaishanavi.jpeg';
import ceoImg from '../assets/pusphendra.jpeg';
import ashwathImg from '../assets/Ashwath.jpeg';
import tanmayImg from '../assets/tanmay.jpeg';
import './OurTeam.css';

const leadershipTeam = [
  {
    name: "Pushpendra",
    role: "Co-Founder & CEO",
    image: ceoImg,
    bio: "Driving the vision and strategy for Scalora Schools.",
    hideWatermark: true,
    objectPosition: "center 80%"
  },
  {
    name: "Ashwath B S",
    role: "Co-Founder & CTO",
    image: ashwathImg,
    bio: "Architecting the technical infrastructure and ecosystem.",
    objectPosition: "center 0%",
    transform: "scale(1.2) translateY(15%)"
  }
];

const coreTeam = [
  {
    name: "Tanmay Saxena",
    role: "Finance & Accounts",
    image: tanmayImg,
    bio: "Managing financial operations and strategy."
  },
  {
    name: "Ayush Singh",
    role: "Marketing & Social Media",
    image: ayushImg,
    bio: "Amplifying our brand and engaging our community."
  },
  {
    name: "Palchil Singh",
    role: "Strategy & Operations",
    image: palchilImg,
    bio: "Ensuring smooth operations and strategic alignment."
  },
  {
    name: "Vaishnavi Sharma",
    role: "Academic Content & Quality",
    image: vaishnaviImg,
    bio: "Maintaining excellence in academic resources."
  },
  {
    name: "Radhe Sharma",
    role: "Content & Communications",
    image: radheImg,
    bio: "Crafting compelling narratives and communications."
  },
  {
    name: "Udyansh",
    role: "Media Production",
    image: udyanshImg,
    bio: "Creating high-quality media and visual content."
  }
];

const allTeam = [...leadershipTeam, ...coreTeam];

const TeamCard = ({ member, index }) => {
  return (
    <div className="team-card">
      <div className="team-image-container">
        <img 
          src={member.image} 
          alt={member.name} 
          className={`team-image ${member.hideWatermark ? 'hide-watermark' : ''}`} 
          style={{ 
            objectPosition: member.objectPosition || 'center center',
            ...(member.transform && { transform: member.transform })
          }}
        />
        
        {/* Hover overlay with details */}
        <div className="team-hover-overlay">
          <div className="overlay-content">
            <div className="overlay-header">
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
            
            <p className="team-bio">{member.bio}</p>
            
            <div className="team-socials">
              <div className="social-icon"><Mail size={20} /></div>
              <div className="social-icon"><MessageCircle size={20} /></div>
              <div className="social-icon"><LinkIcon size={20} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurTeam = () => {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const calculateScroll = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // The total distance to shift left is trackWidth - viewportWidth
        setScrollDistance(trackWidth - viewportWidth);
      }
    };

    calculateScroll();
    // Tiny timeout to ensure DOM layout is completely settled
    setTimeout(calculateScroll, 100);
    
    window.addEventListener("resize", calculateScroll);
    return () => window.removeEventListener("resize", calculateScroll);
  }, []);

  // Animating pure numbers (pixels) is much smoother than calc() strings in Framer Motion
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section ref={targetRef} className="our-team-section-wrapper">
      <div className="our-team-sticky-container">
        
        <motion.div ref={trackRef} style={{ x }} className="team-scroll-track-wrapper">
          
          <div className="team-intro-column">
            <div className="team-header">
              <h2 className="team-main-title">Our Team</h2>
              <p className="team-subtitle">The builders and educators behind the Scalora ecosystem.</p>
            </div>
          </div>

          <div className="team-horizontal-track">
            {allTeam.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </div>

        </motion.div>
        
      </div>
    </section>
  );
};

export default OurTeam;
