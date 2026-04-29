import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Plus, FileText, IndianRupee, Star, Bell, ArrowRight, MoreHorizontal } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const recentOrders = [
    {
      id: '#6689',
      time: '2 mins ago',
      status: 'New',
      type: 'Table 08',
      items: 'Masala Chai x2, Paneer Tikka x1, Garlic Naan x2',
      amount: '₹740.00',
      action: 'Accept',
      badgeClass: 'new',
      borderClass: 'status-new',
      btnClass: 'accept'
    },
    {
      id: '#6688',
      time: '15 mins ago',
      status: 'Prepared',
      type: 'Takeaway',
      items: 'Iced Coffee x1, Veg Club Sandwich x1',
      amount: '₹420.00',
      action: 'Ready',
      badgeClass: 'prepared',
      borderClass: 'status-prepared',
      btnClass: 'ready'
    },
    {
      id: '#6687',
      time: '22 mins ago',
      status: 'Ready',
      type: 'Table 02',
      items: 'Butter Chicken x1, Lachha Paratha x2',
      amount: '₹680.00',
      action: 'Complete',
      badgeClass: 'ready',
      borderClass: 'status-ready',
      btnClass: 'complete'
    }
  ];

  const staffOnDuty = [
    { id: 1, name: 'Raj Thapa', role: 'Kitchen Head', img: 'https://i.pravatar.cc/150?u=raj' },
    { id: 2, name: 'Amit L.', role: 'Floor Manager', img: 'https://i.pravatar.cc/150?u=amit' }
  ];

  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-left">
          <Menu className="menu-icon" size={24} />
          <div className="brand-section">
            <Link to="/dashboard" style={{textDecoration: 'none'}}>
              <span className="brand-logo">
                <span className="brand-logo-menu">Menu</span>
                <span className="brand-logo-99">99</span>
              </span>
            </Link>
            <span className="header-title">Dashboard</span>
          </div>
        </div>
        <button className="add-item-btn">
          <Plus size={16} /> Add Item
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="dashboard-content">
        
        {/* KPIs */}
        <section className="kpi-row">
          {/* Orders KPI */}
          <div className="kpi-card">
            <div className="kpi-header">
              <div>
                <div className="kpi-title">TODAY'S ORDERS</div>
                <div className="kpi-value">42</div>
              </div>
              <div className="kpi-icon-wrapper blue">
                <FileText size={16} />
              </div>
            </div>
            <div className="kpi-footer">
              <div className="mini-chart">
                <div className="mini-bar" style={{height: '20%'}}></div>
                <div className="mini-bar" style={{height: '40%'}}></div>
                <div className="mini-bar" style={{height: '30%'}}></div>
                <div className="mini-bar" style={{height: '60%'}}></div>
                <div className="mini-bar active" style={{height: '90%'}}></div>
                <div className="mini-bar" style={{height: '40%'}}></div>
                <div className="mini-bar" style={{height: '30%'}}></div>
              </div>
            </div>
          </div>

          {/* Revenue KPI */}
          <div className="kpi-card">
            <div className="kpi-header">
              <div>
                <div className="kpi-title">TODAY'S REVENUE</div>
                <div className="kpi-value">₹8,450</div>
              </div>
              <div className="kpi-icon-wrapper orange">
                <IndianRupee size={16} />
              </div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend positive">+ 15.5% vs yesterday</div>
            </div>
          </div>

          {/* Rating KPI */}
          <div className="kpi-card">
            <div className="kpi-header">
              <div>
                <div className="kpi-title">AVERAGE RATING</div>
                <div className="kpi-value">4.8</div>
              </div>
              <div className="kpi-icon-wrapper yellow">
                <Star size={16} />
              </div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend" style={{color: '#94a3b8'}}>Based on 250+ reviews</div>
            </div>
          </div>

          {/* Pending KPI */}
          <div className="kpi-card inverted">
            <div className="kpi-header">
              <div>
                <div className="kpi-title">PENDING ORDERS</div>
                <div className="kpi-value">03</div>
              </div>
              <div className="kpi-icon-wrapper brown">
                <Bell size={16} />
              </div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-subtitle">Requires immediate action!</div>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="main-grid">
          
          {/* RECENT ORDERS */}
          <div className="recent-orders-section">
            <div className="section-header">
              <div className="section-title">Recent Orders</div>
              <Link to="/orders" className="view-all-link">View All <ArrowRight size={14} /></Link>
            </div>

            <div className="orders-list">
              {recentOrders.map((order, idx) => (
                <div key={idx} className={`order-card ${order.borderClass}`}>
                  <div className="order-info">
                    <div className="order-header">
                      <span className="order-id">{order.id}</span>
                      <span className="order-time">{order.time}</span>
                      <span className={`order-badge ${order.badgeClass}`}>{order.status}</span>
                    </div>
                    <div className="order-details">{order.type}</div>
                    <div className="order-items">{order.items}</div>
                  </div>
                  <div className="order-action">
                    <div className="order-amount">{order.amount}</div>
                    <button className={`action-btn ${order.btnClass}`}>{order.action}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="sidebar">
            
            {/* Peak Hours */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <div className="sidebar-card-title">Peak Hours</div>
                <MoreHorizontal className="more-icon" size={16} />
              </div>
              <div className="peak-chart-container">
                <div className="peak-bar-wrapper">
                  <div className="peak-bar" style={{height: '30%'}}></div>
                  <span className="peak-label">12 PM</span>
                </div>
                <div className="peak-bar-wrapper">
                  <div className="peak-bar" style={{height: '50%'}}></div>
                  <span className="peak-label">1 PM</span>
                </div>
                <div className="peak-bar-wrapper">
                  <div className="peak-bar highlight" style={{height: '100%'}}></div>
                  <span className="peak-label">2 PM</span>
                </div>
                <div className="peak-bar-wrapper">
                  <div className="peak-bar secondary" style={{height: '80%'}}></div>
                  <span className="peak-label">3 PM</span>
                </div>
                <div className="peak-bar-wrapper">
                  <div className="peak-bar" style={{height: '40%'}}></div>
                  <span className="peak-label">4 PM</span>
                </div>
                <div className="peak-bar-wrapper">
                  <div className="peak-bar" style={{height: '40%'}}></div>
                  <span className="peak-label">5 PM</span>
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="sidebar-card review-card">
              <div className="review-label">LATEST REVIEW</div>
              <div className="review-text">"Best Masala Chai in the city! Great service."</div>
              <div className="review-footer">
                <div className="stars">
                  <Star size={12} fill="currentColor" stroke="none" />
                  <Star size={12} fill="currentColor" stroke="none" />
                  <Star size={12} fill="currentColor" stroke="none" />
                  <Star size={12} fill="currentColor" stroke="none" />
                  <Star size={12} fill="currentColor" stroke="none" />
                </div>
                <span className="reviewer-name">- Rahul M.</span>
              </div>
            </div>

            {/* Staff */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <div className="sidebar-card-title">Staff on Duty</div>
              </div>
              <div className="staff-list">
                {staffOnDuty.map(staff => (
                  <div key={staff.id} className="staff-item">
                    <div className="staff-info">
                      <img src={staff.img} alt={staff.name} className="staff-avatar" />
                      <div className="staff-details">
                        <span className="staff-name">{staff.name}</span>
                        <span className="staff-role">{staff.role}</span>
                      </div>
                    </div>
                    <div className="status-dot"></div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </section>
      </main>
    </div>
  );
}
