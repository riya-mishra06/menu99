import React, { useState } from 'react';
import { Download, TrendingUp, IndianRupee, CreditCard, Wallet, Calendar } from 'lucide-react';
import './Earnings.css';

export default function Earnings() {
  const [dateRange, setDateRange] = useState('This Week');

  const transactions = [
    { id: 'TXN-001', date: '29 Apr 2025', amount: '₹1,250', method: 'UPI', status: 'Completed' },
    { id: 'TXN-002', date: '29 Apr 2025', amount: '₹450', method: 'Cash', status: 'Completed' },
    { id: 'TXN-003', date: '28 Apr 2025', amount: '₹2,100', method: 'Card', status: 'Completed' },
    { id: 'TXN-004', date: '28 Apr 2025', amount: '₹850', method: 'UPI', status: 'Completed' },
    { id: 'TXN-005', date: '27 Apr 2025', amount: '₹3,400', method: 'UPI', status: 'Completed' }
  ];

  return (
    <div className="earnings-page">
      <main className="earnings-content">
        <div className="page-header-row">
          <h1 className="page-title">Earnings & Reports</h1>
          <button className="export-btn">
            <Download size={16} /> Export CSV
          </button>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Today's Revenue</span>
              <div className="metric-icon green"><IndianRupee size={16} /></div>
            </div>
            <div className="metric-value">₹8,450</div>
            <div className="metric-trend positive"><TrendingUp size={14} /> +15% vs yesterday</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">This Week</span>
              <div className="metric-icon blue"><Calendar size={16} /></div>
            </div>
            <div className="metric-value">₹45,200</div>
            <div className="metric-trend positive"><TrendingUp size={14} /> +8% vs last week</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">UPI & Card Payments</span>
              <div className="metric-icon purple"><CreditCard size={16} /></div>
            </div>
            <div className="metric-value">₹32,150</div>
            <div className="metric-trend text-muted">71% of total revenue</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Cash Payments</span>
              <div className="metric-icon orange"><Wallet size={16} /></div>
            </div>
            <div className="metric-value">₹13,050</div>
            <div className="metric-trend text-muted">29% of total revenue</div>
          </div>
        </div>

        <div className="chart-section">
          <div className="section-header">
            <h2 className="section-title">Revenue Trends</h2>
            <select className="date-select" value={dateRange} onChange={e => setDateRange(e.target.value)}>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="mock-chart-container">
            <div className="chart-y-axis">
              <span>₹10k</span>
              <span>₹8k</span>
              <span>₹6k</span>
              <span>₹4k</span>
              <span>₹2k</span>
              <span>0</span>
            </div>
            <div className="chart-bars">
              {[
                { label: 'Mon', h: '40%' },
                { label: 'Tue', h: '30%' },
                { label: 'Wed', h: '60%' },
                { label: 'Thu', h: '50%' },
                { label: 'Fri', h: '85%' },
                { label: 'Sat', h: '100%' },
                { label: 'Sun', h: '90%' }
              ].map(day => (
                <div key={day.label} className="bar-wrapper">
                  <div className="bar" style={{ height: day.h }}></div>
                  <div className="bar-label">{day.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="transactions-section">
          <h2 className="section-title">Recent Transactions</h2>
          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(txn => (
                  <tr key={txn.id}>
                    <td className="fw-600">{txn.id}</td>
                    <td>{txn.date}</td>
                    <td>
                      <span className={`method-badge ${txn.method.toLowerCase()}`}>
                        {txn.method}
                      </span>
                    </td>
                    <td className="fw-700 text-dark">
                      {txn.amount}
                    </td>
                    <td>
                      <span className="status-badge success">{txn.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
