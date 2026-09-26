import React from 'react';

/**
 * HeroLowerSection — Clean editorial lead and high-impact action buttons
 * Built for Scalora Schools.
 */
export default function HeroLowerSection({
  onPartnerClick,
  onExploreClick
}) {
  return (
    <div className="hero-lower-container">
      <div className="hero-editorial-lead">
        <h2 className="hero-lead-text">
          We help students move from <em>problems to ideas</em>, ideas to{' '}
          <em>solutions</em>, and solutions to{' '}
          <span className="brand-blue-accent">real-world value</span>.
        </h2>
        <p className="hero-lead-detail">
          Through Innovation, Research, Development, Management, and
          Entrepreneurship — Scalora creates a structured
          experiential-learning ecosystem for modern schools.
        </p>
        <div className="hero-cta-actions">
          <a
            href="#partner"
            className="btn-hero-primary"
            onClick={onPartnerClick}
          >
            <span>Partner With Your School</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#model"
            className="btn-hero-secondary"
            onClick={onExploreClick}
          >
            <span>Explore Scalora Framework</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17l9.2-9.2M17 17V8H8" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
