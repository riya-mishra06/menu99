import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, MessageSquare } from 'lucide-react';
import './CustomerReviews.css';


export default function CustomerReviews() {
  const [activeTab, setActiveTab] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const [reviewsData, setReviewsData] = useState([
    {
      id: 1,
      name: 'Amit Shah',
      avatar: 'AS',
      color: '#0ea5e9',
      rating: 5,
      date: '26 Apr 2025',
      text: 'Absolutely loved the café! The ambience is wonderful and the masala chai was the best I\'ve had in years. The paneer tikka was perfectly spiced. Will definitely be coming back with my family!',
      reply: null
    },
    {
      id: 2,
      name: 'Neha Patel',
      avatar: 'NP',
      color: '#ec4899',
      rating: 4,
      date: '24 Apr 2025',
      text: 'Great place for a quick lunch! The veg biryani was flavorful and the staff was very courteous. The waiting time was a bit long during peak hours, but the food was worth it. The cold coffee is also very refreshing.',
      reply: 'Thank you so much Neha! We are working hard to reduce our wait times during peak hours. Hope to see you again soon!'
    },
    {
      id: 3,
      name: 'Deepak Kumar',
      avatar: 'DK',
      color: '#8b5cf6',
      rating: 3,
      date: '22 Apr 2025',
      text: 'Decent café with a nice cozy vibe. The filter coffee was good. However, the snacks section could use some more variety. The seating is comfortable and the WiFi works well for remote work sessions.',
      reply: null
    },
    {
      id: 4,
      name: 'Sneha Iyer',
      avatar: 'SI',
      color: '#10b981',
      rating: 5,
      date: '20 Apr 2025',
      text: 'I ordered via the online menu and the food arrived quickly and was still hot. The butter chicken is absolutely delicious! Packaging was also very neat and the quantity was generous. Highly recommend!',
      reply: null
    }
  ]);

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={13} fill={i < count ? '#f59e0b' : 'none'} stroke={i < count ? '#f59e0b' : '#d1d5db'} />
    ));

  const filtered = activeTab === 'all' ? reviewsData : reviewsData.filter(r => {
    if (activeTab === '5') return r.rating === 5;
    if (activeTab === '4') return r.rating === 4;
    if (activeTab === '3') return r.rating <= 3;
    return true;
  });

  const handleReplySubmit = (id) => {
    if(!replyText) return;
    setReviewsData(prev => prev.map(r => r.id === id ? { ...r, reply: replyText } : r));
    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <div className="reviews-page">
      <main className="reviews-content">
        <div className="page-header-row">
          <h1 className="page-title">Customer Reviews</h1>
          <button className="sort-btn"><Filter size={14} /> Sort by: Latest</button>
        </div>

        <div className="tabs-row">
          {[['all', 'All Reviews'], ['5', '5 Stars'], ['4', '4 Stars'], ['3', '3 & Below']].map(([key, label]) => (
            <button key={key} className={`tab-btn ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
              {label}
            </button>
          ))}
        </div>

        <div className="reviews-list">
          {filtered.map(review => (
            <div key={review.id} className="review-card">
              <div className="avatar-placeholder" style={{ backgroundColor: review.color }}>
                {review.avatar}
              </div>
              <div className="review-body">
                <div className="review-top">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{review.name}</span>
                    <div className="review-meta">
                      <div className="stars">{renderStars(review.rating)}</div>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                  {!review.reply && replyingTo !== review.id && (
                    <button className="reply-btn" onClick={() => { setReplyingTo(review.id); setReplyText(''); }}><MessageSquare size={13} /> Reply</button>
                  )}
                </div>
                <p className="review-text">{review.text}</p>
                
                {replyingTo === review.id && (
                  <div className="reply-input-area" style={{display: 'flex', gap: '8px', marginTop: '12px'}}>
                    <input 
                      type="text" 
                      value={replyText} 
                      onChange={e => setReplyText(e.target.value)} 
                      placeholder="Write a reply..."
                      style={{flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1'}}
                    />
                    <button 
                      onClick={() => handleReplySubmit(review.id)}
                      style={{backgroundColor: '#ea580c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px'}}
                    >
                      Send
                    </button>
                    <button 
                      onClick={() => setReplyingTo(null)}
                      style={{backgroundColor: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer', fontSize: '13px'}}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {review.reply && (
                  <div className="review-reply">
                    <div className="reply-label">Your Reply:</div>
                    {review.reply}
                  </div>
                )}
                {review.reply && replyingTo !== review.id && (
                  <button className="reply-btn" style={{marginTop: '8px'}} onClick={() => { setReplyingTo(review.id); setReplyText(review.reply); }}><MessageSquare size={13} /> Edit Reply</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="page-dot active"></button>
          <button className="page-dot"></button>
          <button className="page-dot"></button>
        </div>
      </main>
    </div>
  );
}
