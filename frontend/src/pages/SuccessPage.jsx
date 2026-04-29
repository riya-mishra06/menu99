import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, Mail, Phone, ArrowLeft, HelpCircle } from 'lucide-react';
import './SuccessPage.css';

export default function SuccessPage() {
  return (
    <div className="success-page">
      <header className="success-header">
        <div className="header-logo">
          <span className="header-logo-menu">Menu</span>
          <span className="header-logo-99">99</span>
        </div>
        <HelpCircle className="header-help" size={24} strokeWidth={1.5} />
      </header>

      <main className="success-content">
        <div className="success-card">
          <div className="success-left">
            <div className="graphic-block">
              <div className="graphic-overlay"></div>
              <div className="graphic-pill">
                <div className="pill-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                </div>
                <div className="pill-text">
                  <span className="pill-text-menu">Menu</span>
                  <span className="pill-text-99">99</span>
                </div>
              </div>
            </div>
            
            <div className="badges-row">
              <div className="badge badge-green">
                <ShieldCheck size={20} />
                OTP verified
              </div>
              <div className="badge badge-blue">
                <Clock size={20} />
                24h review
              </div>
            </div>
          </div>

          <div className="success-right">
            <h1 className="success-title">Thank You For Registering!</h1>
            <p className="success-message">
              Your account has been successfully verified. The Menu99 team will review your application and activate your account within the next 24 hours.
            </p>

            <div className="support-box">
              <p className="support-text">For any immediate assistance, please reach out to our support team:</p>
              <div className="support-contact">
                <div className="contact-item">
                  <Mail size={16} /> info@menu99.in
                </div>
                <div className="contact-item">
                  <Phone size={16} /> +91 7069062333
                </div>
              </div>
            </div>

            <Link to="/login" className="back-btn">
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        </div>
      </main>

      <footer className="success-footer">
        © 2024 CafePulse Management Suite • Menu99 System
      </footer>
    </div>
  );
}
