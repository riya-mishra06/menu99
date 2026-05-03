import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, MonitorSmartphone, Utensils, ShoppingBag, CheckCircle2 } from 'lucide-react';
import './Orders.css';

const WORKFLOWS = {
  online: ['New', 'Accepted', 'Preparing', 'Ready', 'Picked Up', 'On The Way', 'Delivered'],
  table: ['New', 'Accepted', 'Preparing', 'Served', 'Completed'],
  takeaway: ['New', 'Accepted', 'Preparing', 'Ready', 'Handed Over', 'Completed']
};

const initialOrders = [
  {
    id: '#6688', time: '15 mins', status: 'New', type: 'Table 08', typeIcon: 'table',
    items: [{ name: 'Masala Chai', qty: 2, price: '120.00' }, { name: 'Garlic Naan', qty: 1, price: '60.00' }],
    total: '₹180.00'
  },
  {
    id: '#6689', time: '10 mins', status: 'New', type: 'Takeaway', typeIcon: 'takeaway',
    items: [{ name: 'Cold Coffee', qty: 1, price: '80.00' }, { name: 'Cheese Grilled Sandwich', qty: 2, price: '240.00' }],
    total: '₹320.00'
  },
  {
    id: '#6690', time: '5 mins', status: 'New', type: 'Online', typeIcon: 'online',
    items: [{ name: 'Biryani', qty: 1, price: '180.00' }],
    total: '₹180.00'
  },
  {
    id: '#6685', time: '20 mins', status: 'Preparing', type: 'Table 04', typeIcon: 'table',
    items: [{ name: 'Veg Hakka Noodles', qty: 1, price: '180.00' }],
    total: '₹180.00'
  },
  {
    id: '#6628', time: '12:42 PM', status: 'Completed', customer: 'Mukesh R.', type: 'Takeaway', typeIcon: 'takeaway',
    items: [{ name: 'Paneer Tikka Masala', qty: 2, price: '350' }, { name: 'Garlic Naan', qty: 3, price: '150' }],
    total: '₹500.00'
  }
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState('new');
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('menu99_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  React.useEffect(() => {
    localStorage.setItem('menu99_orders', JSON.stringify(orders));
  }, [orders]);

  const newOrders = orders.filter(o => o.status === 'New');
  const progressOrders = orders.filter(o => o.status !== 'New' && o.status !== 'Completed' && o.status !== 'Delivered');
  const completedOrders = orders.filter(o => o.status === 'Completed' || o.status === 'Delivered');

  const handleNextAction = (order) => {
    const workflow = WORKFLOWS[order.typeIcon] || WORKFLOWS.table;
    const currentIndex = workflow.indexOf(order.status);
    if (currentIndex < workflow.length - 1) {
      const nextStatus = workflow[currentIndex + 1];
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: nextStatus, time: 'Just now' } : o));
    }
  };

  const handleRejectOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const getActionText = (typeIcon, currentStatus) => {
    const workflow = WORKFLOWS[typeIcon] || WORKFLOWS.table;
    const currentIndex = workflow.indexOf(currentStatus);
    if (currentIndex < workflow.length - 1) {
      const nextStatus = workflow[currentIndex + 1];
      if (currentStatus === 'New') return 'Accept';
      if (nextStatus === 'Preparing') return 'Start Preparing';
      if (nextStatus === 'Ready') return 'Mark as Ready';
      if (nextStatus === 'Served') return 'Mark as Served';
      if (nextStatus === 'Picked Up') return 'Mark Picked Up';
      if (nextStatus === 'On The Way') return 'Out for Delivery';
      if (nextStatus === 'Delivered') return 'Mark Delivered';
      if (nextStatus === 'Handed Over') return 'Hand Over';
      if (nextStatus === 'Completed') return 'Complete Order';
      return `Move to ${nextStatus}`;
    }
    return '';
  };

  const getBadgeClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, '-');
  };

  const renderProgressBar = (order) => {
    const workflow = WORKFLOWS[order.typeIcon] || WORKFLOWS.table;
    const currentIndex = workflow.indexOf(order.status);
    
    return (
      <div className="progress-timeline">
        {workflow.map((step, idx) => (
          <div key={idx} className={`timeline-step ${idx <= currentIndex ? 'active' : ''} ${idx === currentIndex ? 'current' : ''}`}>
            <div className="step-dot-wrapper">
              <div className="step-dot"></div>
              {idx < workflow.length - 1 && <div className="step-line"></div>}
            </div>
            <span className="step-label">{step}</span>
          </div>
        ))}
      </div>
    );
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'table': return <Utensils size={16} strokeWidth={2.5} />;
      case 'takeaway': return <ShoppingBag size={16} strokeWidth={2.5} />;
      case 'online': return <MonitorSmartphone size={16} strokeWidth={2.5} />;
      default: return <Utensils size={16} strokeWidth={2.5} />;
    }
  };

  return (
    <div className="orders-page">
      {/* MAIN CONTENT */}
      <main className="orders-content">
        <div className="orders-page-header">
          <h1 className="page-title">Orders</h1>
          <button className="add-item-btn">
            <Plus size={16} /> Add Order
          </button>
        </div>
        
        {/* TABS */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            New Orders <span className="tab-count">{newOrders.length}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            In Progress <span className="tab-count">{progressOrders.length}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed <span className="tab-count">{completedOrders.length}</span>
          </button>
        </div>

        {/* ORDERS GRID */}
        {activeTab === 'new' && (
          <div className="orders-grid">
            {newOrders.map((order, idx) => (
              <div key={idx} className="new-order-card">
                
                <div className="card-header-row">
                  <div className="card-id-time">
                    <span className="card-id">ORDER {order.id}</span>
                    <span className="card-time">{order.time}</span>
                  </div>
                  <div className="card-badge new">
                    <Clock size={12} strokeWidth={2.5} /> {order.status}
                  </div>
                </div>

                <div className="card-type-row">
                  {getTypeIcon(order.typeIcon)}
                  {order.type}
                </div>

                <div className="card-items-list">
                  {order.items.map((item, i) => (
                    <div key={i} className="item-row">
                      <div className="item-name">
                        {item.name} <span className="item-qty">x{item.qty}</span>
                      </div>
                      <div className="item-price">₹{item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="card-divider"></div>

                <div className="card-total-row">
                  <span className="total-label">Total</span>
                  <span className="total-amount">{order.total}</span>
                </div>

                <div className="card-actions">
                  <button className="btn-accept" onClick={() => handleNextAction(order)}>{getActionText(order.typeIcon, order.status)}</button>
                  <button className="btn-reject" onClick={() => handleRejectOrder(order.id)}>Reject</button>
                </div>

              </div>
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="orders-grid">
            {progressOrders.map((order, idx) => (
              <div key={idx} className="new-order-card progress-card">
                
                <div className="card-header-row">
                  <div className="card-id-time">
                    <span className="card-id">ORDER {order.id}</span>
                    <span className="card-time">{order.time}</span>
                  </div>
                  <div className={`card-badge ${getBadgeClass(order.status)}`}>
                    <Utensils size={12} strokeWidth={2.5} /> {order.status}
                  </div>
                </div>

                {renderProgressBar(order)}

                <div className="card-type-row" style={{marginTop: '16px'}}>
                  {getTypeIcon(order.typeIcon)}
                  {order.type}
                </div>

                <div className="card-items-list">
                  {order.items.map((item, i) => (
                    <div key={i} className="item-row">
                      <div className="item-name">
                        {item.name} <span className="item-qty">x{item.qty}</span>
                      </div>
                      <div className="item-price">₹{item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="card-divider"></div>

                <div className="card-total-row">
                  <span className="total-label">Total</span>
                  <span className="total-amount">{order.total}</span>
                </div>

                <div className="card-actions">
                  <button className="btn-full-action" onClick={() => handleNextAction(order)}>{getActionText(order.typeIcon, order.status)}</button>
                </div>

              </div>
            ))}
          </div>
        )}

        {activeTab === 'completed' && (
          <>
            <div className="orders-grid">
              {completedOrders.map((order, idx) => (
                <div key={idx} className="completed-order-card">
                  
                  <div className="completed-header">
                    <span className="completed-id">{order.id}</span>
                    <div className="completed-icon">
                      {getTypeIcon(order.typeIcon)}
                    </div>
                  </div>
                  
                  <div className="completed-customer">{order.customer}</div>

                  <div className="card-items-list" style={{ marginBottom: '0' }}>
                    {order.items.map((item, i) => (
                      <div key={i} className="completed-item-row">
                        <span>{item.qty}x {item.name}</span>
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="completed-total-row">
                    <span>Total Amount</span>
                    <span>{order.total}</span>
                  </div>

                  <div className="completed-footer">
                    <div className={`completed-badge ${getBadgeClass(order.status)}`}>
                      <CheckCircle2 size={14} strokeWidth={2.5} /> {order.status}
                    </div>
                    <span className="completed-time">{order.time}</span>
                  </div>

                </div>
              ))}
            </div>
            
            <div className="view-history-container">
              <button className="btn-view-history">View Past History</button>
            </div>
          </>
        )}
        
      </main>
    </div>
  );
}
