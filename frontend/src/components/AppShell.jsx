import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, BookOpen, LayoutGrid,
  Star, IndianRupee, User, Settings, LogOut, Bell
} from 'lucide-react';
import './AppShell.css';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/orders', icon: ShoppingBag, label: 'Orders', badge: 3 },
  { to: '/menu', icon: BookOpen, label: 'Menu Management' },
  { to: '/tables', icon: LayoutGrid, label: 'Table Management' },
  { to: '/reviews', icon: Star, label: 'Customer Reviews' },
  { to: '/earnings', icon: IndianRupee, label: 'Earnings & Reports' },
];

const bottomItems = [
  { to: '/profile', icon: User, label: 'Cafe Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function AppShell({ children, pageTitle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-logo">
          <span className="sidebar-logo-text">
            <span className="logo-menu">Menu</span>
            <span className="logo-99">99</span>
          </span>
        </NavLink>

        <div className="sidebar-cafe-name">Menu99 Cafe, Surat</div>

        <div className="sidebar-links">
          <div className="sidebar-section-label">Main</div>
          {navItems.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
              {badge && <span className="sidebar-badge">{badge}</span>}
            </NavLink>
          ))}

          <div className="sidebar-divider" />
          <div className="sidebar-section-label">Account</div>

          {bottomItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}

          <button className="sidebar-link" onClick={handleLogout} style={{ marginTop: 'auto' }}>
            <LogOut size={18} strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">DT</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Dipak Thakor</div>
              <div className="sidebar-user-role">Owner</div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN AREA */}
      <div className="shell-main">
        {/* TOP BAR */}
        <header className="shell-topbar">
          <div className="topbar-breadcrumb">
            {pageTitle}
          </div>
          <div className="topbar-right">
            <div className="cafe-status-pill">
              <div className="cafe-status-dot"></div>
              Cafe Open
            </div>
            <button className="topbar-notif-btn">
              <Bell size={16} />
              <div className="notif-dot"></div>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="shell-content">
          {children}
        </div>
      </div>
    </div>
  );
}
