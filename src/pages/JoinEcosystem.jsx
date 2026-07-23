import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, User, Users, Briefcase, ArrowLeft, CheckCircle2, Check, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

import './JoinEcosystem.css';

const ROLES = [
  {
    id: 'Principal',
    title: 'Principals',
    subtitle: 'Partner your school with Scalora Schools',
    icon: <Briefcase size={32} />,
    benefits: [
      'Industry seminars for Classes 9–12',
      'Innovation & technology clubs',
      'Workshops and competitions',
      'Career awareness sessions',
      'Teacher development opportunities',
      'School partnership program'
    ],
    buttonText: 'Apply as Principal',
    fields: [
      { name: 'schoolName', label: 'School Name', type: 'text', required: true },
      { name: 'principalName', label: 'Principal Name', type: 'text', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'board', label: 'Board (CBSE/ICSE/State)', type: 'text', required: true },
      { name: 'studentStrength', label: 'Student Strength', type: 'text', required: true },
      { name: 'interestedPrograms', label: 'Interested Programs', type: 'text', required: true },
      { name: 'meetingPreference', label: 'Meeting Preference', type: 'text', required: true }
    ]
  },
  {
    id: 'Teacher',
    title: 'Teachers',
    subtitle: 'Join our educator network',
    icon: <User size={32} />,
    benefits: [
      'Conduct Scalora programs',
      'Teacher certification',
      'Workshop facilitator opportunities',
      'Student club mentoring',
      'Resource library',
      'Community of educators'
    ],
    buttonText: 'Join as Teacher',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'school', label: 'School', type: 'text', required: true },
      { name: 'subject', label: 'Subject', type: 'text', required: true },
      { name: 'experience', label: 'Years of Experience', type: 'text', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'areasOfInterest', label: 'Areas of Interest', type: 'text', required: true },
      { name: 'resumeUrl', label: 'Resume URL (Optional)', type: 'text', required: false }
    ]
  },
  {
    id: 'Student',
    title: 'Students',
    subtitle: 'Learn, build, and grow with Scalora',
    icon: <GraduationCap size={32} />,
    benefits: [
      'Tech & AI workshops',
      'Innovation challenges',
      'Student clubs',
      'Certificates',
      'Competitions',
      'Industry exposure'
    ],
    buttonText: 'Apply as Student',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'class', label: 'Class / Grade', type: 'text', required: true },
      { name: 'school', label: 'School', type: 'text', required: true },
      { name: 'parentContact', label: 'Parent Contact Number', type: 'tel', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'interests', label: 'Interests (AI, Coding, Robotics, etc.)', type: 'text', required: true }
    ]
  },
  {
    id: 'Parent',
    title: 'Parents',
    subtitle: "Support your child's future-ready learning",
    icon: <Users size={32} />,
    benefits: [
      'Register your child',
      'Program updates',
      'Progress tracking',
      'Workshops',
      'Career guidance sessions',
      'Parent community'
    ],
    buttonText: 'Register Child',
    fields: [
      { name: 'parentName', label: 'Parent Name', type: 'text', required: true },
      { name: 'studentName', label: 'Student Name', type: 'text', required: true },
      { name: 'class', label: 'Student Class', type: 'text', required: true },
      { name: 'school', label: 'School', type: 'text', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'interestedPrograms', label: 'Interested Programs', type: 'text', required: true }
    ]
  },
  {
    id: 'Coordinator',
    title: 'Coordinators',
    subtitle: 'School Coordinators / Counselors',
    icon: <LayoutDashboard size={32} />,
    benefits: [
      'Manage student registrations',
      'Coordinate events',
      'Liaise with Scalora',
      'Support clubs and competitions'
    ],
    buttonText: 'Join as Coordinator',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'school', label: 'School', type: 'text', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'role', label: 'Specific Role (Counselor, IT Admin, etc.)', type: 'text', required: true }
    ]
  }
];

const JoinEcosystem = () => {
  const navigate = useNavigate();
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Ensure page loads at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRoleSelect = (roleObj, e) => {
    e.preventDefault();
    setSelectedRoleData(roleObj);
    setIsSuccess(false);
    
    // Initialize form data with empty strings for all fields
    const initialData = {};
    roleObj.fields.forEach(field => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
  };

  const handleBack = (e) => {
    if (selectedRoleData) {
      e.preventDefault();
      setSelectedRoleData(null);
      setIsSuccess(false);
      setFormData({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Find generic fields if they exist, otherwise use a default or empty
      const name = formData.name || formData.principalName || formData.parentName || 'Unknown';
      const email = formData.email || 'unknown@example.com';
      const phone = formData.phone || formData.parentContact || 'Unknown';

      // 1. Save to Supabase database
      const { error } = await supabase
        .from('applications')
        .insert([
          { 
            name: name,
            email: email,
            phone: phone,
            role: selectedRoleData.id,
            details: formData
          }
        ]);

      if (error) throw error;
      
      // 2. Send automated email using secure Supabase Edge Function
      if (email !== 'unknown@example.com') {
        const { error: emailError } = await supabase.functions.invoke('send-confirmation-email', {
          body: { 
            name: name,
            email: email, 
            role: selectedRoleData.title 
          }
        });
        
        if (emailError) {
          console.error("Failed to send email:", emailError);
        }
      }

      setIsSuccess(true);
      setFormData({});
    } catch (error) {
      console.error('Error submitting application:', error.message);
      alert('Failed to submit: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="join-page">
      <div className="join-page-header">
        {selectedRoleData ? (
          <a href="#" onClick={handleBack} className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Roles</span>
          </a>
        ) : (
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        )}
      </div>
      
      <div className="join-content">
        <div className="join-title-section">
          <div className="text-logo" style={{ justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <span className="text-logo-top" style={{ color: '#000000' }}>SCALORA</span>
            <span className="text-logo-bottom" style={{ color: '#000000' }}>SCHOOLS</span>
          </div>
          <h1>
            {selectedRoleData ? `Join as ${selectedRoleData.title}` : 'Join the Ecosystem'}
          </h1>
          <p>
            {selectedRoleData 
              ? 'Fill out your details below and our team will be in touch.' 
              : 'Select your role below to apply and get started.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedRoleData ? (
            <motion.div 
              key="roles"
              className="join-options join-options-large"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {ROLES.map((role) => (
                <div key={role.id} className="join-option-card detailed-card">
                  <div className="card-header">
                    <div className="join-icon-wrapper">
                      {role.icon}
                    </div>
                    <div className="join-text">
                      <h3>{role.title}</h3>
                      <p>{role.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="card-benefits">
                    <ul>
                      {role.benefits.map((benefit, idx) => (
                        <li key={idx}>
                          <Check size={16} className="check-icon" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={(e) => handleRoleSelect(role, e)} 
                    className="card-apply-btn"
                  >
                    {role.buttonText}
                  </button>
                </div>
              ))}
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              className="join-success-message"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div className="success-icon-wrapper">
                <CheckCircle2 size={64} className="success-icon" />
              </div>
              <h2>Application Received!</h2>
              <p>Thank you for your interest in joining the Scalora ecosystem. We will review your details and get back to you shortly.</p>
              <button onClick={() => {
                window.scrollTo(0, 0);
                navigate('/');
              }} className="success-back-btn">
                Return to Homepage
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              className="join-form detailed-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-grid">
                {selectedRoleData.fields.map((field) => (
                  <div className="form-group" key={field.name}>
                    <label htmlFor={field.name}>
                      {field.label} {field.required && <span className="required">*</span>}
                    </label>
                    <input 
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>

              <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JoinEcosystem;
