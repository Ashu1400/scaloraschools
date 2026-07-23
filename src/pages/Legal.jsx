import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, Cookie, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Legal.css';

const TABS = [
  { id: 'terms', label: 'Terms of Service', icon: <FileText size={20} /> },
  { id: 'privacy', label: 'Privacy Policy', icon: <Shield size={20} /> },
  { id: 'cookies', label: 'Cookie Policy', icon: <Cookie size={20} /> },
];

const TermsContent = () => (
  <div className="legal-content-body">
    <h2>Terms of Service</h2>
    <p className="effective-date">Last Updated: July 24, 2026</p>
    
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing or using the Scalora Schools platform, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use the service.</p>
    
    <h3>2. Description of Service</h3>
    <p>Scalora Schools provides an ecosystem connecting educational institutions, students, parents, and industry partners. We offer technology solutions, real-world skills training, and networking opportunities.</p>
    
    <h3>3. User Accounts</h3>
    <p>When you create an account or submit an application with us, you guarantee that the information you provide is accurate, complete, and current at all times. Inaccurate information may result in immediate termination of your account or application.</p>
    
    <h3>4. Intellectual Property</h3>
    <p>The service and its original content, features, and functionality are and will remain the exclusive property of Scalora Academy Pvt Ltd and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without prior written consent.</p>
    
    <h3>5. Limitation of Liability</h3>
    <p>In no event shall Scalora Academy Pvt Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
  </div>
);

const PrivacyContent = () => (
  <div className="legal-content-body">
    <h2>Privacy Policy</h2>
    <p className="effective-date">Last Updated: July 24, 2026</p>
    
    <h3>1. Information We Collect</h3>
    <p>We collect information you provide directly to us when you apply to join our ecosystem, including names, email addresses, phone numbers, and school affiliations. We also collect usage data automatically when you interact with our platform.</p>
    
    <h3>2. How We Use Your Information</h3>
    <p>We use the information we collect to process your applications, communicate with you, provide and maintain our services, improve our platform, and personalize your experience.</p>
    
    <h3>3. Data Sharing and Disclosure</h3>
    <p>We do not sell your personal data. We may share your information with trusted third-party service providers who assist us in operating our platform, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
    
    <h3>4. Data Security</h3>
    <p>We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
    
    <h3>5. Your Rights</h3>
    <p>Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or restrict its processing. Contact us to exercise these rights.</p>
  </div>
);

const CookieContent = () => (
  <div className="legal-content-body">
    <h2>Cookie Policy</h2>
    <p className="effective-date">Last Updated: July 24, 2026</p>
    
    <h3>1. What Are Cookies</h3>
    <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
    
    <h3>2. How We Use Cookies</h3>
    <p>We use cookies for several reasons. Some cookies are required for technical reasons in order for our platform to operate (Essential Cookies). Other cookies enable us to track and target the interests of our users to enhance their experience on our platform (Analytics and Performance Cookies).</p>
    
    <h3>3. Types of Cookies We Use</h3>
    <ul>
      <li><strong>Essential Cookies:</strong> Strictly necessary to provide you with services available through our platform and to use some of its features.</li>
      <li><strong>Performance and Functionality Cookies:</strong> Used to enhance the performance and functionality of our platform but are non-essential to their use.</li>
      <li><strong>Analytics and Customization Cookies:</strong> Collect information that is used either in aggregate form to help us understand how our platform is being used or how effective our marketing campaigns are.</li>
    </ul>
    
    <h3>4. Managing Cookies</h3>
    <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser controls. If you choose to reject cookies, you may still use our platform though your access to some functionality and areas may be restricted.</p>
  </div>
);

const Legal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('terms');

  // Parse URL to get initial tab
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && TABS.find(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
    // Always scroll to top when page loads
    window.scrollTo(0, 0);
  }, [location]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/legal?tab=${tabId}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'terms': return <TermsContent />;
      case 'privacy': return <PrivacyContent />;
      case 'cookies': return <CookieContent />;
      default: return <TermsContent />;
    }
  };

  return (
    <div className="legal-page-container">
      <Header />
      
      <main className="legal-main">
        <div className="legal-header-section">
          <div className="legal-header-content">
            <Link to="/" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
            <h1>Legal & Compliance</h1>
            <p>Transparency and security are at the core of the Scalora Ecosystem.</p>
          </div>
        </div>

        <div className="legal-content-section container">
          <div className="legal-sidebar">
            <nav className="legal-nav">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`legal-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="legal-contact-box">
              <h4>Questions?</h4>
              <p>Contact our legal team if you have any questions about these policies.</p>
              <a href="mailto:legal@scaloraschools.com" className="legal-email-link">
                legal@scaloraschools.com
              </a>
            </div>
          </div>

          <div className="legal-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
