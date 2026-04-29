import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, CreditCard, Bell, Clock, Shield } from 'lucide-react';
import './Settings.css';

function Toggle({ on, onToggle }) {
  return (
    <div className={`toggle ${on ? 'on' : 'off'}`} onClick={onToggle} role="switch" aria-checked={on} />
  );
}

export default function Settings() {
  const [settings, setSettings] = useState({
    language: 'English',
    timezone: 'IST (UTC+5:30)',
    currency: 'INR (₹)',
    dateFormat: 'DD/MM/YYYY',
    gateway: 'Razorpay',
    upiId: 'menu99@upi',
    taxEnabled: true,
    taxRate: '18',
    autoSettle: false,
    orderNotif: true,
    reviewNotif: true,
    reportNotif: false,
    paymentNotif: true,
    openTime: '08:00 AM',
    closeTime: '11:00 PM',
    autoClose: true,
  });

  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));
  const set = (key, val) => setSettings(s => ({ ...s, [key]: val }));

  return (
    <div className="settings-page">
      <header className="settings-header">
        <Link to="/dashboard" className="brand-logo">
          <span className="brand-logo-menu">Menu</span>
          <span className="brand-logo-99">99</span>
        </Link>
        <div className="header-actions">
          <button className="btn-discard">Discard Changes</button>
          <button className="btn-save">Save Settings</button>
        </div>
      </header>

      <main className="settings-content">
        <h1 className="settings-title">Settings</h1>

        <div className="settings-grid">
          {/* Language & Region */}
          <div className="settings-card">
            <div className="card-title"><Globe size={16} /> Language & Region</div>
            <div className="settings-row">
              <div className="setting-item">
                <div>
                  <div className="setting-label">Language</div>
                  <div className="setting-sublabel">Display language</div>
                </div>
                <select className="setting-select" value={settings.language} onChange={e => set('language', e.target.value)}>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Gujarati</option>
                </select>
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-label">Timezone</div>
                </div>
                <span className="setting-value">{settings.timezone}</span>
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-label">Currency</div>
                </div>
                <span className="setting-value">{settings.currency}</span>
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-label">Date Format</div>
                </div>
                <span className="setting-value">{settings.dateFormat}</span>
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="settings-card">
            <div className="card-title"><CreditCard size={16} /> Payment Settings</div>
            <div className="settings-row">
              <div className="setting-item">
                <div>
                  <div className="setting-label">Payment Gateway</div>
                </div>
                <select className="setting-select" value={settings.gateway} onChange={e => set('gateway', e.target.value)}>
                  <option>Razorpay</option>
                  <option>Paytm</option>
                  <option>Stripe</option>
                </select>
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-label">UPI ID</div>
                </div>
                <input className="setting-input" value={settings.upiId} onChange={e => set('upiId', e.target.value)} />
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-label">Tax Enabled (GST)</div>
                  <div className="setting-sublabel">Apply tax on all orders</div>
                </div>
                <Toggle on={settings.taxEnabled} onToggle={() => toggle('taxEnabled')} />
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-label">Tax Rate (%)</div>
                </div>
                <input className="setting-input" style={{width: '80px'}} value={settings.taxRate} onChange={e => set('taxRate', e.target.value)} />
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-label">Auto-Settle Orders</div>
                </div>
                <Toggle on={settings.autoSettle} onToggle={() => toggle('autoSettle')} />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="settings-card">
            <div className="card-title"><Bell size={16} /> Notifications</div>
            <div className="settings-row">
              {[
                ['orderNotif', 'New Order Alerts', 'Sound & push notification'],
                ['reviewNotif', 'Customer Reviews', 'When a new review is posted'],
                ['reportNotif', 'Daily Reports', 'Receive end-of-day summary'],
                ['paymentNotif', 'Payment Alerts', 'Every successful payment'],
              ].map(([key, label, sub]) => (
                <div key={key} className="setting-item">
                  <div>
                    <div className="setting-label">{label}</div>
                    <div className="setting-sublabel">{sub}</div>
                  </div>
                  <Toggle on={settings[key]} onToggle={() => toggle(key)} />
                </div>
              ))}
            </div>
          </div>

          {/* Cafe Timing */}
          <div className="settings-card">
            <div className="card-title"><Clock size={16} /> Cafe Timing</div>
            <div className="settings-row">
              <div className="setting-item">
                <div className="setting-label">Opening Hours</div>
                <div className="timing-row">
                  <input className="setting-input" style={{width: '100px'}} value={settings.openTime} onChange={e => set('openTime', e.target.value)} />
                  <span>to</span>
                  <input className="setting-input" style={{width: '100px'}} value={settings.closeTime} onChange={e => set('closeTime', e.target.value)} />
                </div>
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-label">Auto Close Orders</div>
                  <div className="setting-sublabel">Stop accepting orders at closing time</div>
                </div>
                <Toggle on={settings.autoClose} onToggle={() => toggle('autoClose')} />
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-label">Security</div>
                  <div className="setting-sublabel">Manage password & 2FA</div>
                </div>
                <Link to="/security" className="security-link">Manage →</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
