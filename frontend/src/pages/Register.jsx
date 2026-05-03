import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cloud, TrendingUp, Camera, ArrowRight } from 'lucide-react';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({
    cafeName: 'Menu99 Cafe',
    ownerName: 'Dipak Thakor',
    email: 'dipak@gmail.com',
    phone: '9876543210',
    password: 'password123',
    confirmPassword: 'password123',
    license: 'AB-12345678',
    address: 'Street name, City, State, ZIP',
    about: 'Briefly describe your cafe\'s vibe and specialty...'
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering', formData);
    navigate('/verify-email');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="register-page">
      <nav className="register-nav">
        <div className="register-logo">Menu99</div>
        <div className="register-nav-right">
          <button className="nav-help-btn">Help</button>
          <Link to="/login" className="nav-login-btn">Login</Link>
        </div>
      </nav>

      <main className="register-main">
        <div className="register-content">
          
          <div className="register-left">
            <h1 className="register-heading">Scale your cafe operations<br/>with ease.</h1>
            <p className="register-subheading">
              Join 2,500+ cafe owners who trust CafePanel for lightning-fast orders, inventory management, and revenue growth.
            </p>
            
            <div className="register-image-wrapper">
              <img src="/cafe-interior.png" alt="Cafe interior" className="register-image" />
            </div>

            <div className="register-features">
              <div className="feature-item">
                <div className="feature-icon"><Cloud size={20} strokeWidth={2} /></div>
                <div className="feature-text">
                  <h3>Real-time KDS</h3>
                  <p>Instant order sync across devices.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><TrendingUp size={20} strokeWidth={2} /></div>
                <div className="feature-text">
                  <h3>Revenue Insights</h3>
                  <p>Track peak hours and top sellers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="register-right">
            <div className="register-card">
              
              <div className="identity-section">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button 
                  type="button" 
                  className="upload-btn" 
                  onClick={handleUploadClick}
                  style={logoPreview ? { padding: 0, overflow: 'hidden' } : {}}
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <>
                      <Camera size={20} strokeWidth={2.5}/>
                      <span>UPLOAD LOGO</span>
                    </>
                  )}
                </button>
                <div className="identity-text">
                  <h3>Cafe Identity</h3>
                  <p>Upload your brand mark. This will appear on digital receipts and the customer ordering app.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Cafe Name</label>
                    <input type="text" name="cafeName" value={formData.cafeName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Owner Full Name</label>
                    <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Business Licence Number</label>
                  <input type="text" name="license" value={formData.license} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Full Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>About the Cafe</label>
                  <textarea name="about" value={formData.about} onChange={handleChange} rows="2"></textarea>
                </div>

                <div className="checkbox-group">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>. I certify that all provided business information is accurate.
                  </label>
                </div>

                <button type="submit" className="submit-btn">
                  Submit <ArrowRight size={18} strokeWidth={2.5}/>
                </button>
              </form>

              <div className="login-link">
                Already have an account? <Link to="/login">Sign in here</Link>
              </div>

            </div>
          </div>

        </div>
      </main>

      <footer className="register-footer">
        <div className="footer-left">CafePanel</div>
        <div className="footer-center">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Support</a>
          <a href="#">System Status</a>
        </div>
        <div className="footer-right">
          © 2024 CafePanel Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
