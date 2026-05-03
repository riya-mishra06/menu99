import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
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

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const notifRef = useRef(null);

  const [isCafeOpen, setIsCafeOpen] = useState(true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New order received (#1042)', time: '2 mins ago', read: false },
    { id: 2, title: 'Table 4 requested bill', time: '10 mins ago', read: false },
    { id: 3, title: 'Low stock on Coffee Beans', time: '1 hour ago', read: true }
  ]);

  // Handle outside click to close notifications
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/orders': return 'Orders';
      case '/menu': return 'Menu Management';
      case '/tables': return 'Table Management';
      case '/reviews': return 'Customer Reviews';
      case '/earnings': return 'Earnings & Reports';
      case '/profile': return 'Cafe Profile';
      case '/settings': return 'Settings';
      case '/security': return 'Security Settings';
      default: return 'Dashboard';
    }
  };

  const pageTitle = getPageTitle();

  const toggleCafeStatus = () => {
    setIsCafeOpen(!isCafeOpen);
  };

  const toggleNotifPanel = () => {
    setIsNotifOpen(!isNotifOpen);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

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
            <button 
              className={`cafe-status-pill ${isCafeOpen ? 'open' : 'closed'}`}
              onClick={toggleCafeStatus}
            >
              <div className="cafe-status-dot"></div>
              {isCafeOpen ? 'Cafe Open' : 'Cafe Closed'}
            </button>
            <div className="notif-wrapper" ref={notifRef}>
              <button className="topbar-notif-btn" onClick={toggleNotifPanel}>
                <Bell size={16} />
                {unreadCount > 0 && <div className="notif-dot"></div>}
              </button>
              
              {isNotifOpen && (
                <div className="notif-panel">
                  <div className="notif-header">
                    <h4>Notifications</h4>
                    <span className="notif-count">{unreadCount} new</span>
                  </div>
                  <div className="notif-list">
                    {notifications.length > 0 ? notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={`notif-item ${!notif.read ? 'unread' : ''}`}
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className="notif-content">
                          <p className="notif-title">{notif.title}</p>
                          <span className="notif-time">{notif.time}</span>
                        </div>
                        {!notif.read && <div className="notif-unread-dot"></div>}
                      </div>
                    )) : (
                      <div className="notif-empty">No new notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="shell-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
