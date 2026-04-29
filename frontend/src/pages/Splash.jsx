import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Shield } from 'lucide-react';
import './Splash.css';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login after 3 seconds to let animation finish
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page-splash">
      <div className="splash-content">
        <div className="splash-icon-wrapper">
          <Utensils className="splash-icon" size={32} strokeWidth={2.5} />
        </div>
        <h1 className="splash-title">Menu99</h1>
        <p className="splash-subtitle">Empowering Cafe Owners</p>
        
        <div className="splash-loader-track">
          <div className="splash-loader-fill"></div>
        </div>
        
        <p className="splash-loading-text">INITIALIZING DASHBOARD</p>
      </div>
      
      <div className="splash-footer">
        <Shield size={12} strokeWidth={2.5} />
        <span>Enterprise Secure Node</span>
      </div>
    </div>
  );
}
