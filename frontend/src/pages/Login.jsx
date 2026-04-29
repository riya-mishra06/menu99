import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with', email, password);
    navigate('/dashboard');
  };

  return (
    <div className="dark-login-page">
      <div className="dark-login-container">
        <div className="dark-logo-section">
          <div className="dark-logo-text">
            <span className="dark-logo-cafe">Cafe</span><span className="dark-logo-panel">Panel</span>
          </div>
          <div className="dark-subtitle">
            તમારા કાફેને સ્માર્ટ બનાવો • Make your cafe smart
          </div>
        </div>

        <div className="dark-welcome-text">
          Welcome back 👋
        </div>

        <form onSubmit={handleLogin} className="dark-form">
          <div className="dark-form-group">
            <label className="dark-form-label" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              className="dark-form-input" 
              placeholder="owner@mycafe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="dark-form-group">
            <label className="dark-form-label" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              className="dark-form-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Link to="/forgot-password" className="dark-forgot-password">Forgot Password?</Link>

          <button type="submit" className="dark-login-btn">
            Login to Dashboard
          </button>
        </form>

        <div className="dark-register-section">
          New cafe? <Link to="/register" className="dark-register-link">Register here &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
