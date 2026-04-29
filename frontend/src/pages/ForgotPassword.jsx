import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending reset link to:', email);
    // Add logic to call password reset API here
  };

  return (
    <div className="forgot-page">
      <header className="forgot-header">
        <div className="header-logo">
          <span className="header-logo-menu">Menu</span>
          <span className="header-logo-99">99</span>
        </div>
        <Link to="#" className="header-support">Support</Link>
      </header>

      <main className="forgot-content">
        <div className="forgot-card">
          <div className="icon-container">
            <div className="icon-inner">
              <KeyRound size={22} strokeWidth={2.5} />
            </div>
          </div>
          
          <h1 className="forgot-title">Forgot Password?</h1>
          <p className="forgot-subtitle">
            Enter the email associated with your cafe account<br/>
            and we'll send a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Cafe Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  id="email"
                  className="email-input"
                  placeholder="owner@menu99.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit <ArrowRight size={16} />
            </button>
          </form>

          <div className="divider"></div>

          <Link to="/login" className="back-link">
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </main>

      <footer className="forgot-footer">
        <div>© 2024 Menu99. All rights reserved.</div>
        <div className="footer-links">
          <Link to="#">Help Center</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
