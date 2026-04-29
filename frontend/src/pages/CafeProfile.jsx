import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import './CafeProfile.css';

export default function CafeProfile() {
  const [form, setForm] = useState({
    cafeName: 'Menu 99 Cafe',
    ownerName: 'Dipak Thakor',
    email: 'menu99cafe@gmail.com',
    phone: '+91 98765 43210',
    address: '12, Lal Darwaja Market, Surat, Gujarat - 395003',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395003',
    openTime: '08:00 AM',
    closeTime: '11:00 PM',
    holidays: 'None',
    description: 'A cozy neighbourhood café offering authentic Indian beverages and snacks in the heart of Surat. We pride ourselves on fresh ingredients and excellent service that keeps customers coming back.',
    upiId: 'menu99@upi',
    bankName: 'HDFC Bank',
    accountNo: '***********4521'
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile saved:', form);
    alert('Profile saved successfully!');
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <Link to="/dashboard" className="brand-logo-link">
          <span className="brand-logo-menu-p">Menu</span>
          <span className="brand-logo-99-p">99</span>
        </Link>
        <button className="share-btn"><Share2 size={14} /> Share Profile</button>
      </header>

      <main className="profile-content">
        <div>
          <div className="profile-title-row">
            <h1 className="profile-title">Profile</h1>
          </div>
          <div className="cafe-name-line">
            <strong>{form.cafeName}</strong> &bull; {form.city}, {form.state}
            <span className="rating-badge">⭐ 4.8</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="section-card" style={{marginBottom: '24px'}}>
            <div className="section-heading">Basic Information</div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Cafe Name</label>
                <input className="form-input" name="cafeName" value={form.cafeName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Owner Name</label>
                <input className="form-input" name="ownerName" value={form.ownerName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" name="email" value={form.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" name="phone" value={form.phone} onChange={handleChange} />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Address</label>
                <input className="form-input" name="address" value={form.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" name="city" value={form.city} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input className="form-input" name="state" value={form.state} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Operational Details */}
          <div className="section-card" style={{marginBottom: '24px'}}>
            <div className="section-heading">Operational Details</div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Opening Time</label>
                <input className="form-input" name="openTime" value={form.openTime} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Closing Time</label>
                <input className="form-input" name="closeTime" value={form.closeTime} onChange={handleChange} />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Weekly Off / Holidays</label>
                <input className="form-input" name="holidays" value={form.holidays} onChange={handleChange} />
              </div>
              <div className="form-group full-width">
                <label className="form-label">About the Cafe</label>
                <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="save-bar">
            <button type="submit" className="save-btn">Save Changes</button>
          </div>
        </form>
      </main>
    </div>
  );
}
