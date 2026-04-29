import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Lock } from 'lucide-react';
import './SecurityPassword.css';

export default function SecurityPassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [twoFa, setTwoFa] = useState(true);

  const getStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(passwords.newPass);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const isStrong = strength >= 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Password updated');
    alert('Password updated successfully!');
  };

  return (
    <div className="security-page">
      <header className="security-header">
        <Link to="/dashboard" className="brand-logo-s">
          <span className="brand-logo-menu-s">Menu</span>
          <span className="brand-logo-99-s">99</span>
        </Link>
        <div className="header-right-s">
          <span>Cafe Open</span>
          <div className="cafe-toggle">
            <div className="mini-toggle"></div>
          </div>
        </div>
      </header>

      <main className="security-content">
        <div className="security-card">
          <div className="security-card-title">
            <div className="security-icon">
              <ShieldCheck size={22} strokeWidth={2} />
            </div>
            <h1 className="security-title">Security & Password</h1>
          </div>
          <p className="security-subtitle">Keep your account safe and secure</p>

          <form className="security-form" onSubmit={handleSubmit}>
            {/* Current Password */}
            <div className="sec-form-group">
              <label className="sec-label">Current Password</label>
              <div className="sec-input-wrapper">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  className="sec-input"
                  placeholder="••••••••"
                  value={passwords.current}
                  onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                />
                <button type="button" className="eye-btn" onClick={() => setShowCurrent(!showCurrent)}>
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="sec-form-group">
              <label className="sec-label">New Password</label>
              <div className="sec-input-wrapper">
                <input
                  type={showNew ? 'text' : 'password'}
                  className="sec-input"
                  placeholder="••••••••"
                  value={passwords.newPass}
                  onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))}
                />
                <button type="button" className="eye-btn" onClick={() => setShowNew(!showNew)}>
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwords.newPass && (
                <>
                  <div className="strength-bar">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`strength-segment ${i <= strength ? 'filled' : ''} ${i <= strength && isStrong ? 'strong' : ''}`} />
                    ))}
                  </div>
                  <span className="strength-label">Strength: {strengthLabel}</span>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="sec-form-group">
              <label className="sec-label">Confirm New Password</label>
              <div className="sec-input-wrapper">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="sec-input"
                  placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                />
                <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* 2FA Toggle */}
            <div className="two-fa-row">
              <div className="two-fa-text">
                <div className="two-fa-title">Two-Factor Authentication</div>
                <div className="two-fa-desc">Adds an extra layer of security to your account</div>
              </div>
              <div className="two-fa-toggle" onClick={() => setTwoFa(!twoFa)} style={{ background: twoFa ? '#10b981' : '#cbd5e1', cursor: 'pointer' }}></div>
            </div>

            <button type="submit" className="update-btn">
              <Lock size={16} /> Update Password
            </button>
          </form>

          <div className="security-footer">
            <Link to="/settings">← Back to Settings</Link>
            &bull;
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
