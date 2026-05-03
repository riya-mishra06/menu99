import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, QrCode, Edit2, FileText } from 'lucide-react';
import './TableManagement.css';

export default function TableManagement() {
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('menu99_tables');
    return saved ? JSON.parse(saved) : [
      { id: 'T1', status: 'empty' },
      { id: 'T2', status: 'occupied', orderId: '#6421', time: '12:30 PM', items: 4 },
      { id: 'T3', status: 'empty' },
      { id: 'T4', status: 'empty' },
      { id: 'T5', status: 'occupied', orderId: '#6422', time: '12:45 PM', items: 2 },
      { id: 'T6', status: 'empty' },
      { id: 'T7', status: 'empty' }
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('menu99_tables', JSON.stringify(tables));
  }, [tables]);

  const handleAddTable = () => {
    const newId = `T${tables.length + 1}`;
    setTables([...tables, { id: newId, status: 'empty' }]);
  };

  return (
    <div className="table-management-page">
      {/* MAIN CONTENT */}
      <main className="table-content">
        <div className="table-page-header">
          <div>
            <h1 className="page-title">Table Management</h1>
            <p className="page-subtitle">Configure your floor plan and generate digital ordering codes.</p>
          </div>
          <button className="add-table-btn" onClick={handleAddTable}>
            <Plus size={16} /> Add Table
          </button>
        </div>
        
        <div className="table-grid">
          {tables.map((table) => (
            <div key={table.id} className={`table-card ${table.status}`}>
              <div className="card-top">
                <div className="table-id">{table.id}</div>
                
                {table.status === 'empty' ? (
                  <div className="empty-content">
                    <div className="qr-placeholder">
                      <QrCode size={32} />
                    </div>
                  </div>
                ) : (
                  <div className="occupied-content">
                    <div className="active-label">ACTIVE ORDER</div>
                    <div className="order-id">{table.orderId}</div>
                    <div className="order-details">
                      {table.time} &bull; {table.items} Items
                    </div>
                  </div>
                )}
              </div>
              
              <div className="card-divider"></div>
              
              <div className="card-footer">
                {table.status === 'empty' ? (
                  <>
                    <button className="card-action-btn action-edit">
                      <Edit2 size={14} /> Edit
                    </button>
                    <button className="card-action-btn action-qr">
                      <QrCode size={14} /> QR Code
                    </button>
                  </>
                ) : (
                  <>
                    <button className="card-action-btn action-edit">
                      <FileText size={14} /> View Order
                    </button>
                    <button className="card-action-btn action-qr">
                      <QrCode size={14} /> QR Code
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* ADD NEW TABLE CARD */}
          <div className="table-card add-table-card" onClick={handleAddTable}>
            <div className="add-icon-wrapper">
              <Plus size={24} />
            </div>
            <span className="add-text">Add New Table</span>
          </div>

        </div>
      </main>
    </div>
  );
}
