import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import './MenuManagement.css';

export default function MenuManagement() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Snacks', type: 'veg', img: null });
  const fileInputRef = React.useRef(null);


  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('menu99_menu');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Masala Chai',
        category: 'Hot Beverages',
        price: '60',
        type: 'veg',
        inStock: true,
        img: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 2,
        name: 'Filter Coffee',
        category: 'Hot Beverages',
        price: '80',
        type: 'veg',
        inStock: true,
        img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 3,
        name: 'Paneer Tikka Sandwich',
        category: 'Snacks',
        price: '140',
        type: 'veg',
        inStock: true,
        img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 4,
        name: 'Chicken Club Sandwich',
        category: 'Snacks',
        price: '180',
        type: 'non-veg',
        inStock: false,
        img: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 5,
        name: 'Cold Coffee with Ice Cream',
        category: 'Cold Beverages',
        price: '150',
        type: 'veg',
        inStock: true,
        img: 'https://images.unsplash.com/photo-1461023058943-07cb1ce8db23?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 6,
        name: 'Butter Chicken Biryani',
        category: 'Main Course',
        price: '320',
        type: 'non-veg',
        inStock: true,
        img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80'
      }
    ];
  });

  const defaultCategories = ['Hot Beverages', 'Cold Beverages', 'Snacks', 'Main Course', 'Desserts'];

  const availableCategories = React.useMemo(() => {
    const fromItems = menuItems.map(item => item.category);
    return [...new Set([...defaultCategories, ...fromItems])];
  }, [menuItems]);

  const displayCategories = ['All', ...availableCategories];

  React.useEffect(() => {
    localStorage.setItem('menu99_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  const toggleStock = (id) => {
    setMenuItems(items => items.map(item => 
      item.id === id ? { ...item, inStock: !item.inStock } : item
    ));
  };

  const handleDelete = (id) => {
    setMenuItems(items => items.filter(item => item.id !== id));
  };

  const openAddModal = () => {
    setNewItem({ name: '', price: '', category: 'Snacks', type: 'veg', img: null });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setNewItem({ name: item.name, price: item.price, category: item.category, type: item.type, img: item.img });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = () => {
    if(!newItem.name || !newItem.price) return;
    
    if (editingId) {
      setMenuItems(items => items.map(item => 
        item.id === editingId ? { ...item, ...newItem } : item
      ));
    } else {
      const added = {
        id: Date.now(),
        name: newItem.name,
        category: newItem.category,
        price: newItem.price,
        type: newItem.type,
        inStock: true,
        img: newItem.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80' // default food image
      };
      setMenuItems([added, ...menuItems]);
    }
    
    setIsModalOpen(false);
    setEditingId(null);
    setNewItem({ name: '', price: '', category: 'Snacks', type: 'veg', img: null });
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-management-page">
      <main className="menu-content">
        <div className="page-header-row">
          <h1 className="page-title">Menu Management</h1>
          <button className="add-item-btn" onClick={openAddModal}>
            <Plus size={16} /> Add New Item
          </button>
        </div>

        <div className="menu-controls">
          <div className="search-bar-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search menu items..." 
              className="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-tabs">
            {displayCategories.map(cat => (
              <button 
                key={cat} 
                className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-list">
          {filteredItems.map(item => (
            <div key={item.id} className={`menu-item-card ${!item.inStock ? 'out-of-stock' : ''}`}>
              <div className="item-image-wrapper">
                <img src={item.img} alt={item.name} className="item-image" />
                <div className={`veg-indicator ${item.type}`}>
                  <div className="dot"></div>
                </div>
              </div>
              
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-category">{item.category}</div>
              </div>

              <div className="item-price">
                ₹{item.price}
              </div>

              <div className="item-stock-control">
                <span className="stock-label">{item.inStock ? 'In Stock' : 'Out of Stock'}</span>
                <div className={`toggle-switch ${item.inStock ? 'on' : 'off'}`} onClick={() => toggleStock(item.id)}>
                  <div className="toggle-thumb"></div>
                </div>
              </div>

              <div className="item-actions">
                <button className="icon-btn edit" onClick={() => handleEdit(item)}><Edit2 size={16} /></button>
                <button className="icon-btn delete" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="empty-state">
              <div className="empty-text">No items found matching your criteria.</div>
            </div>
          )}
        </div>
      </main>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Item' : 'Add New Item'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="modal-body-layout">
                <div className="modal-body-left">
                  <div className="form-group" style={{ textAlign: 'center' }}>
                    <label>Item Image</label>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <div 
                      className="image-upload-preview" 
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        width: '140px', height: '140px', borderRadius: '12px', margin: '0 auto',
                        backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', overflow: 'hidden', border: '2px dashed #cbd5e1', marginTop: '4px'
                      }}
                    >
                      {newItem.img ? (
                        <img src={newItem.img} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ color: '#94a3b8', fontSize: '12px', textAlign: 'center' }}>
                          <Plus size={24} style={{ margin: '0 auto 4px' }}/>
                          Add Photo
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-body-right">
                  <div className="form-group">
                    <label>Item Name</label>
                    <input type="text" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} placeholder="e.g. Samosa" />
                  </div>
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input type="number" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} placeholder="e.g. 50" />
                  </div>
                  <div style={{display: 'flex', gap: '16px', width: '100%'}}>
                    <div className="form-group" style={{flex: 1}}>
                      <label>Category</label>
                      <input 
                        type="text" 
                        value={newItem.category} 
                        onChange={e => setNewItem({...newItem, category: e.target.value})} 
                        placeholder="e.g. Snacks"
                        list="category-options"
                      />
                      <datalist id="category-options">
                        {availableCategories.map(c => <option key={c} value={c} />)}
                      </datalist>
                    </div>
                    <div className="form-group" style={{flex: 1}}>
                      <label>Type</label>
                      <select value={newItem.type} onChange={e => setNewItem({...newItem, type: e.target.value})}>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button className="save-modal-btn" onClick={handleSaveItem}>
                {editingId ? 'Save Changes' : 'Save Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
