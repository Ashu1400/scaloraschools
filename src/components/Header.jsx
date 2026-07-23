import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Add Google Translate Script
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,te,mr,ta,ur,gu,kn,ml,or,pa',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo-link">
          <div className="text-logo">
            <span className="text-logo-top">SCALORA</span>
            <span className="text-logo-bottom">SCHOOLS</span>
          </div>
        </Link>

        <nav className={`desktop-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#ecosystem">The Ecosystem</a></li>
            <li><a href="#schools">For Schools</a></li>
            <li><a href="#students">For Students</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <div id="google_translate_element" className="language-switch"></div>
          <Link to="/join" className="portal-btn" style={{ textDecoration: 'none' }}>Join Ecosystem</Link>
          
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
