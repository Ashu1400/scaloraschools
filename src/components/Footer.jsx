import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Scalora Schools" className="footer-logo-img" />
            <p className="footer-desc">
              Building a student ecosystem that extends learning beyond the classroom. Empowering the next generation of leaders, builders, and innovators.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Ecosystem</h4>
              <ul>
                <li><Link to="/join">For Schools</Link></li>
                <li><Link to="/join">For Students</Link></li>
                <li><Link to="/join">For Parents</Link></li>
                <li><Link to="/join">Industry Partners</Link></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/legal?tab=terms">Terms of Service</Link></li>
                <li><Link to="/legal?tab=privacy">Privacy Policy</Link></li>
                <li><Link to="/legal?tab=cookies">Cookie Policy</Link></li>
              </ul>
            </div>
            
            <div className="link-group contact-group">
              <h4>Hablemos</h4>
              <a href="mailto:scaloraschools@gmail.com" className="footer-email">
                scaloraschools@gmail.com
                <ArrowRight size={16} />
              </a>
              <div className="social-links">
                <a href="https://instagram.com/scaloraschools" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://wa.me/919625196435" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Scalora Schools by Scalora Academy Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
