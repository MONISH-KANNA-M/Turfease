import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Clock, MapPin, Star, ShoppingBag, User, Settings, LogOut } from 'lucide-react';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate fetching user bookings
    setBookings([
      {
        id: 1,
        turfName: 'Green Valley Sports Complex',
        date: '2024-01-15',
        time: '10:00 AM - 12:00 PM',
        status: 'confirmed',
        amount: 1500
      },
      {
        id: 2,
        turfName: 'City Sports Arena',
        date: '2024-01-20',
        time: '6:00 PM - 8:00 PM',
        status: 'pending',
        amount: 2000
      }
    ]);

    // Simulate fetching user orders
    setOrders([
      {
        id: 1,
        items: ['Football', 'Cones Set'],
        total: 850,
        status: 'delivered',
        date: '2024-01-10'
      },
      {
        id: 2,
        items: ['Cricket Bat', 'Tennis Balls'],
        total: 1200,
        status: 'shipped',
        date: '2024-01-12'
      }
    ]);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-avatar">
              <User size={32} />
            </div>
            <div className="profile-info">
              <h3>{user?.name || 'User'}</h3>
              <p>{user?.email}</p>
            </div>
          </div>

          <nav className="dashboard-nav">
            <button
              className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar size={20} />
              My Bookings
            </button>
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={20} />
              My Orders
            </button>
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <Settings size={20} />
              Profile Settings
            </button>
            <button className="nav-item logout" onClick={handleLogout}>
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </div>

        <div className="dashboard-content">
          {activeTab === 'bookings' && (
            <div className="content-section">
              <h2>My Bookings</h2>
              <div className="bookings-grid">
                {bookings.map(booking => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <h3>{booking.turfName}</h3>
                      <span className={`status ${booking.status}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="booking-details">
                      <div className="detail-item">
                        <Calendar size={16} />
                        <span>{booking.date}</span>
                      </div>
                      <div className="detail-item">
                        <Clock size={16} />
                        <span>{booking.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="amount">₹{booking.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="content-section">
              <h2>My Orders</h2>
              <div className="orders-grid">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <h3>Order #{order.id}</h3>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <p className="items">{order.items.join(', ')}</p>
                      <div className="order-meta">
                        <span className="date">{order.date}</span>
                        <span className="total">₹{order.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="content-section">
              <h2>Profile Settings</h2>
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={user?.name || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user?.email || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" value={user?.phone || ''} readOnly />
                </div>
                <button className="update-btn">Update Profile</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .user-dashboard {
          min-height: 100vh;
          background: #f8fafc;
          padding: 2rem 0;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          padding: 0 1rem;
        }

        .dashboard-sidebar {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          height: fit-content;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .profile-avatar {
          width: 48px;
          height: 48px;
          background: var(--primary-green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .profile-info h3 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
        }

        .profile-info p {
          margin: 0;
          font-size: 0.875rem;
          color: #64748b;
        }

        .dashboard-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
          text-align: left;
        }

        .nav-item:hover {
          background: #f1f5f9;
          color: #1e293b;
        }

        .nav-item.active {
          background: var(--primary-green);
          color: white;
        }

        .nav-item.logout {
          margin-top: 1rem;
          color: #ef4444;
        }

        .nav-item.logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        .dashboard-content {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .content-section h2 {
          margin: 0 0 1.5rem 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
        }

        .bookings-grid,
        .orders-grid {
          display: grid;
          gap: 1rem;
        }

        .booking-card,
        .order-card {
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .booking-card:hover,
        .order-card:hover {
          border-color: var(--primary-green);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.1);
        }

        .booking-header,
        .order-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .booking-header h3,
        .order-header h3 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status.confirmed {
          background: #dcfce7;
          color: #166534;
        }

        .status.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status.delivered {
          background: #dcfce7;
          color: #166534;
        }

        .status.shipped {
          background: #dbeafe;
          color: #1e40af;
        }

        .booking-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.875rem;
        }

        .amount {
          font-weight: 600;
          color: var(--primary-green);
          font-size: 1rem;
        }

        .order-details .items {
          color: #64748b;
          margin-bottom: 0.75rem;
        }

        .order-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .order-meta .date {
          color: #64748b;
          font-size: 0.875rem;
        }

        .order-meta .total {
          font-weight: 600;
          color: var(--primary-green);
          font-size: 1rem;
        }

        .profile-form {
          max-width: 400px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
        }

        .update-btn {
          background: var(--primary-green);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .update-btn:hover {
          background: var(--primary-green-dark);
        }

        @media (max-width: 768px) {
          .dashboard-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;