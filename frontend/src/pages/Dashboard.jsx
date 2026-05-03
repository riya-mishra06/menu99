import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, IndianRupee, Star, Bell, ArrowRight, MoreHorizontal } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [orders, setOrders] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    const savedOrders = localStorage.getItem('menu99_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    const savedReviews = localStorage.getItem('menu99_reviews');
    if (savedReviews) setReviews(JSON.parse(savedReviews));
  }, []);

  const [staffOnDuty, setStaffOnDuty] = React.useState(() => {
    const saved = localStorage.getItem('menu99_staff');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Raj Thapa', role: 'Kitchen Head', img: 'https://i.pravatar.cc/150?u=raj' },
      { id: 2, name: 'Amit L.', role: 'Floor Manager', img: 'https://i.pravatar.cc/150?u=amit' }
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('menu99_staff', JSON.stringify(staffOnDuty));
  }, [staffOnDuty]);

  const totalOrders = orders.length > 0 ? orders.length : 42;
  const pendingOrders = orders.length > 0 ? orders.filter(o => o.status !== 'Completed' && o.status !== 'Delivered').length : 3;
  
  const revenue = orders.length > 0 
    ? orders.reduce((sum, order) => sum + parseFloat(order.total.replace(/[^0-9.]/g, '') || 0), 0)
    : 8450;
    
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 4.8;
    
  const latestReview = reviews.length > 0 
    ? reviews.find(r => r.rating >= 4) || reviews[0]
    : { text: '"Best Masala Chai in the city! Great service."', rating: 5, name: 'Rahul M.' };

  const recentOrdersList = orders.length > 0 
    ? orders.slice(0, 3).map(o => ({
        id: o.id,
        time: o.time,
        status: o.status,
        type: o.type,
        items: o.items ? o.items.map(i => `${i.name} x${i.qty}`).join(', ') : '',
        amount: o.total,
        badgeClass: o.status.toLowerCase().replace(/\s+/g, '-'),
        borderClass: `status-${o.status.toLowerCase().replace(/\s+/g, '-')}`
      }))
    : [
        { id: '#6689', time: '2 mins ago', status: 'New', type: 'Table 08', items: 'Masala Chai x2, Paneer Tikka x1, Garlic Naan x2', amount: '₹740.00', badgeClass: 'new', borderClass: 'status-new' },
        { id: '#6688', time: '15 mins ago', status: 'Preparing', type: 'Takeaway', items: 'Iced Coffee x1, Veg Club Sandwich x1', amount: '₹420.00', badgeClass: 'preparing', borderClass: 'status-preparing' },
        { id: '#6687', time: '22 mins ago', status: 'Ready', type: 'Table 02', items: 'Butter Chicken x1, Lachha Paratha x2', amount: '₹680.00', badgeClass: 'ready', borderClass: 'status-ready' }
      ];
  const [isAddingStaff, setIsAddingStaff] = React.useState(false);
  const [newStaffName, setNewStaffName] = React.useState('');
  const [newStaffRole, setNewStaffRole] = React.useState('');

  const handleAddStaff = () => {
    if (newStaffName.trim() && newStaffRole.trim()) {
      setStaffOnDuty(prev => [...prev, {
        id: Date.now(),
        name: newStaffName,
        role: newStaffRole,
        img: `https://i.pravatar.cc/150?u=${Date.now()}`
      }]);
      setNewStaffName('');
      setNewStaffRole('');
      setIsAddingStaff(false);
    }
  };

  const handleRemoveStaff = (id) => {
    setStaffOnDuty(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="dashboard-page">
      {/* MAIN CONTENT */}
      <main className="dashboard-content">
        
        {/* KPIs */}
        <section className="kpi-row">
          {/* Orders KPI */}
          <div className="kpi-card">
            <div className="kpi-header">
              <div>
                <div className="kpi-title">TODAY'S ORDERS</div>
                <div className="kpi-value">{totalOrders}</div>
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
                <div className="kpi-value">₹{revenue.toLocaleString('en-IN')}</div>
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
                <div className="kpi-value">{averageRating}</div>
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
                <div className="kpi-value">{pendingOrders.toString().padStart(2, '0')}</div>
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
              {recentOrdersList.map((order, idx) => (
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
                    <Link to="/orders" className="action-btn accept" style={{textDecoration: 'none', textAlign: 'center'}}>Manage</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WIDGETS */}
          <aside className="dashboard-widgets">
            
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
              <div className="review-text">"{latestReview.text}"</div>
              <div className="review-footer">
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={12} fill={i < latestReview.rating ? '#f59e0b' : 'none'} stroke={i < latestReview.rating ? '#f59e0b' : '#d1d5db'} />
                  ))}
                </div>
                <span className="reviewer-name">- {latestReview.name}</span>
              </div>
            </div>

            {/* Staff */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <div className="sidebar-card-title">Staff on Duty</div>
                <button 
                  className="add-staff-btn" 
                  onClick={() => setIsAddingStaff(!isAddingStaff)}
                  title="Add Staff"
                >
                  <Plus size={16} />
                </button>
              </div>

              {isAddingStaff && (
                <div className="add-staff-form">
                  <input 
                    type="text" 
                    placeholder="Staff Name" 
                    value={newStaffName} 
                    onChange={e => setNewStaffName(e.target.value)} 
                    className="staff-input"
                  />
                  <input 
                    type="text" 
                    placeholder="Role (e.g. Waiter)" 
                    value={newStaffRole} 
                    onChange={e => setNewStaffRole(e.target.value)} 
                    className="staff-input"
                  />
                  <button className="staff-submit-btn" onClick={handleAddStaff}>Add to Duty</button>
                </div>
              )}

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
                    <div className="staff-actions">
                      <div className="status-dot"></div>
                      <button 
                        className="remove-staff-btn" 
                        onClick={() => handleRemoveStaff(staff.id)}
                        title="Remove staff"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                {staffOnDuty.length === 0 && (
                  <div className="no-staff-msg">No staff currently on duty.</div>
                )}
              </div>
            </div>

          </aside>

        </section>
      </main>
    </div>
  );
}
