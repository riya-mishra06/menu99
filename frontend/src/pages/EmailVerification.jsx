import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Clock, ChevronLeft, ArrowRight } from 'lucide-react';
import './EmailVerification.css';

export default function EmailVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setHasError(false);

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.some(isNaN)) return;
    
    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      newOtp[index] = value;
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = value;
      }
    });
    setOtp(newOtp);
    
    // Focus last filled or next empty
    const focusIndex = Math.min(pastedData.length, 5);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    // TODO: Implement actual resend API call
  };

  const formatTime = (seconds) => {
    return `0:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue === '123456') { // Mock correct OTP
      console.log('Verifying OTP:', otpValue);
      navigate('/success');
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="verification-page">
      <div className="verification-content">
        <div className="verification-card">
          <div className="icon-container">
            <Mail size={28} strokeWidth={2.5} />
          </div>
          
          <h1 className="verification-title">Email Verification</h1>
          <p className="verification-subtitle">
            We've sent a 6-digit verification code to your email<br/>
            <span className="verification-email-highlight">owner@example.com</span>. Please enter it below:
          </p>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="otp-container">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className={`otp-input ${hasError ? 'error' : ''}`}
                  required
                />
              ))}
            </div>

            {hasError && (
              <div className="error-message">
                <div className="error-dot"></div>
                Invalid OTP, please try again
              </div>
            )}

            <button type="submit" className="verify-btn">
              Verify & Complete <ArrowRight size={18} />
            </button>
          </form>

          <div className="resend-container">
            <div className="timer">
              <Clock size={16} /> Resend in {formatTime(timeLeft)}
            </div>
            <button 
              className="resend-btn" 
              onClick={handleResend}
              disabled={timeLeft > 0}
            >
              Resend OTP
            </button>
          </div>

          <div className="divider"></div>

          <Link to="/register" className="back-link">
            <ChevronLeft size={16} /> Back to registration
          </Link>
        </div>
      </div>

      <footer className="verification-footer">
        <div className="footer-left">
          <div className="footer-logo">
            <span className="footer-logo-menu">Menu</span>
            <span className="footer-logo-99">99</span>
          </div>
          <span>© 2024 Cafe Operations Console</span>
        </div>
        <div className="footer-links">
          <Link to="#">Support</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
