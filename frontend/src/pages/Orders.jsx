import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, MonitorSmartphone, Utensils, ShoppingBag, CheckCircle2 } from 'lucide-react';
import './Orders.css';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('new');

  const [newOrders, setNewOrders] = useState([
    {
      id: '#6688',
      time: '15 mins',
      status: 'NEW',
      type: 'Table 08',
      typeIcon: 'table',
      items: [
        { name: 'Masala Chai', qty: 2, price: '120.00' },
        { name: 'Garlic Naan', qty: 1, price: '60.00' }
      ],
      total: '₹180.00'
    },
    {
      id: '#6689',
      time: '10 mins',
      status: 'NEW',
      type: 'Takeaway',
      typeIcon: 'takeaway',
      items: [
        { name: 'Cold Coffee', qty: 1, price: '80.00' },
        { name: 'Cheese Grilled Sandwich', qty: 2, price: '240.00' }
      ],
      total: '₹320.00'
    },
    {
      id: '#6690',
      time: '5 mins',
      status: 'NEW',
      type: 'Online',
      typeIcon: 'online',
      items: [
        { name: 'Biryani', qty: 1, price: '180.00' }
      ],
      total: '₹180.00'
    },
    {
      id: '#6691',
      time: 'Just now',
      status: 'NEW',
      type: 'Table 02',
      typeIcon: 'table',
      items: [
        { name: 'Butter Chicken', qty: 1, price: '150.00' },
        { name: 'Tandoori Roti', qty: 3, price: '45.00' }
      ],
      total: '₹195.00'
    }
  ]);

  const [progressOrders, setProgressOrders] = useState([
    {
      id: '#6685',
      time: '20 mins',
      status: 'PREPARING',
      type: 'Table 04',
      typeIcon: 'table',
      items: [
        { name: 'Veg Hakka Noodles', qty: 1, price: '180.00' }
      ],
      total: '₹180.00',
      action: 'Mark Ready'
    }
  ]);

  const [completedOrders, setCompletedOrders] = useState([
    {
      id: '#6628',
      time: '12:42 PM',
      customer: 'Mukesh R.',
      typeIcon: 'takeaway',
      items: [
        { name: 'Paneer Tikka Masala', qty: 2, price: '350' },
        { name: 'Garlic Naan', qty: 3, price: '150' }
      ],
      total: '₹500'
    }
  ]);

  const handleAcceptOrder = (order) => {
    setNewOrders(prev => prev.filter(o => o.id !== order.id));
    setProgressOrders(prev => [{...order, status: 'PREPARING', action: 'Mark Ready'}, ...prev]);
  };

  const handleRejectOrder = (orderId) => {
    setNewOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const handleCompleteOrder = (order) => {
    setProgressOrders(prev => prev.filter(o => o.id !== order.id));
    
    // Convert progress order to completed order format
    const newCompleted = {
      id: order.id,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      customer: 'Walk-in Customer',
      typeIcon: order.typeIcon,
      items: order.items,
      total: order.total
    };
    
    setCompletedOrders(prev => [newCompleted, ...prev]);
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
                  <div className="card-badge">
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
                  <button className="btn-accept" onClick={() => handleAcceptOrder(order)}>Accept</button>
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
                  <div className="card-badge preparing">
                    <Utensils size={12} strokeWidth={2.5} /> {order.status}
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
                  <button className="btn-full-action" onClick={() => handleCompleteOrder(order)}>{order.action}</button>
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
                    <div className="completed-badge">
                      <CheckCircle2 size={14} strokeWidth={2.5} /> Completed
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
