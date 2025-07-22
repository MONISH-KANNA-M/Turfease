import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Eye
} from 'lucide-react';

const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [turfs, setTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate fetching owner stats
    setStats({
      totalRevenue: 45000,
      totalBookings: 128,
      activeTurfs: 3,
      totalProducts: 24
    });

    // Simulate fetching owner turfs
    setTurfs([
      {
        id: 1,
        name: 'Green Valley Sports Complex',
        location: 'Sector 15, Gurgaon',
        price: 1500,
        bookings: 45,
        rating: 4.5
      },
      {
        id: 2,
        name: 'City Sports Arena',
        location: 'MG Road, Bangalore',
        price: 2000,
        bookings: 38,
        rating: 4.2
      }
    ]);

    // Simulate fetching recent bookings
    setBookings([
      {
        id: 1,
        turfName: 'Green Valley Sports Complex',
        customerName: 'John Doe',
        date: '2024-01-15',
        time: '10:00 AM - 12:00 PM',
        amount: 1500,
        status: 'confirmed'
      },
      {
        id: 2,
        turfName: 'City Sports Arena',
        customerName: 'Jane Smith',
        date: '2024-01-16',
        time: '6:00 PM - 8:00 PM',
        amount: 2000,
        status: 'pending'
      }
    ]);

    // Simulate fetching products
    setProducts([
      {
        id: 1,
        name: 'Professional Football',
        price: 450,
        stock: 25,
        sales: 12
      },
      {
        id: 2,
        name: 'Cricket Bat',
        price: 800,
        stock: 15,
        sales: 8
      }
    ]);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="owner-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="owner-profile">
            <div className="profile-avatar">
              <MapPin size={32} />
            </div>
            <div className="profile-info">
              <h3>{user?.businessName || 'Business Owner'}</h3>
              <p>{user?.email}</p>
            </div>
          </div>

          <nav className="dashboard-nav">
            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <TrendingUp size={20} />
              Overview
            </button>
            <button
              className={`nav-item ${activeTab === 'turfs' ? 'active' : ''}`}
              onClick={() => setActiveTab('turfs')}
            >
              <MapPin size={20} />
              My Turfs
            </button>
            <button
              className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar size={20} />
              Bookings
            </button>
            <button
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={20} />
              Products
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} />
              Settings
            </button>
            <button className="nav-item logout" onClick={handleLogout}>
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="content-section">
              <h2>Dashboard Overview</h2>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon revenue">
                    <DollarSign size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>₹{stats.totalRevenue?.toLocaleString()}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon bookings">
                    <Calendar size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.totalBookings}</h3>
                    <p>Total Bookings</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon turfs">
                    <MapPin size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.activeTurfs}</h3>
                    <p>Active Turfs</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon products">
                    <Package size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.totalProducts}</h3>
                    <p>Products Listed</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Bookings</h3>
                <div className="activity-list">
                  {bookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="activity-item">
                      <div className="activity-info">
                        <h4>{booking.customerName}</h4>
                        <p>{booking.turfName} - {booking.date}</p>
                      </div>
                      <div className="activity-amount">
                        ₹{booking.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'turfs' && (
            <div className="content-section">
              <div className="section-header">
                <h2>My Turfs</h2>
                <button className="add-btn">
                  <Plus size={20} />
                  Add New Turf
                </button>
              </div>
              
              <div className="turfs-grid">
                {turfs.map(turf => (
                  <div key={turf.id} className="turf-card">
                    <div className="turf-header">
                      <h3>{turf.name}</h3>
                      <div className="turf-actions">
                        <button className="action-btn">
                          <Eye size={16} />
                        </button>
                        <button className="action-btn">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="turf-details">
                      <p className="location">{turf.location}</p>
                      <div className="turf-stats">
                        <span className="price">₹{turf.price}/hour</span>
                        <span className="bookings">{turf.bookings} bookings</span>
                        <span className="rating">★ {turf.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="content-section">
              <h2>All Bookings</h2>
              <div className="bookings-table">
                <div className="table-header">
                  <span>Customer</span>
                  <span>Turf</span>
                  <span>Date & Time</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>
                {bookings.map(booking => (
                  <div key={booking.id} className="table-row">
                    <span>{booking.customerName}</span>
                    <span>{booking.turfName}</span>
                    <span>{booking.date} {booking.time}</span>
                    <span>₹{booking.amount}</span>
                    <span className={`status ${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Products & Accessories</h2>
                <button className="add-btn">
                  <Plus size={20} />
                  Add Product
                </button>
              </div>
              
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-header">
                      <h3>{product.name}</h3>
                      <div className="product-actions">
                        <button className="action-btn">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="product-stats">
                        <span className="price">₹{product.price}</span>
                        <span className="stock">Stock: {product.stock}</span>
                        <span className="sales">Sales: {product.sales}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="content-section">
              <h2>Business Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Business Name</label>
                  <input type="text" value={user?.businessName || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user?.email || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Business Address</label>
                  <textarea value={user?.businessAddress || ''} readOnly rows="3" />
                </div>
                <button className="update-btn">Update Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .owner-dashboard {
          min-height: 100vh;
          background: #f8fafc;
          padding: 2rem 0;
        }

        .dashboard-container {
          max-width: 1400px;
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

        .owner-profile {
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
          background: var(--primary-blue);
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
          background: var(--primary-blue);
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

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary-green);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-btn:hover {
          background: var(--primary-green-dark);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-icon.revenue { background: #059669; }
        .stat-icon.bookings { background: #3b82f6; }
        .stat-icon.turfs { background: #8b5cf6; }
        .stat-icon.products { background: #f59e0b; }

        .stat-info h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .stat-info p {
          margin: 0;
          font-size: 0.875rem;
          color: #64748b;
        }

        .recent-activity h3 {
          margin-bottom: 1rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 0.5rem;
        }

        .activity-info h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .activity-info p {
          margin: 0;
          font-size: 0.875rem;
          color: #64748b;
        }

        .activity-amount {
          font-weight: 600;
          color: var(--primary-green);
        }

        .turfs-grid,
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .turf-card,
        .product-card {
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .turf-card:hover,
        .product-card:hover {
          border-color: var(--primary-blue);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .turf-header,
        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .turf-header h3,
        .product-header h3 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
        }

        .turf-actions,
        .product-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
        }

        .location {
          color: #64748b;
          margin-bottom: 1rem;
        }

        .turf-stats,
        .product-stats {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .turf-stats span,
        .product-stats span {
          padding: 0.25rem 0.75rem;
          background: #f1f5f9;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .price {
          background: #dcfce7 !important;
          color: #166534 !important;
        }

        .bookings,
        .stock {
          background: #dbeafe !important;
          color: #1e40af !important;
        }

        .rating,
        .sales {
          background: #fef3c7 !important;
          color: #92400e !important;
        }

        .bookings-table {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .table-header,
        .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr 0.8fr 0.8fr;
          gap: 1rem;
          padding: 1rem;
          align-items: center;
        }

        .table-header {
          background: #f8fafc;
          border-radius: 0.5rem;
          font-weight: 600;
          color: #374151;
        }

        .table-row {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .table-row:hover {
          border-color: var(--primary-blue);
          background: #f8fafc;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          text-align: center;
        }

        .status.confirmed {
          background: #dcfce7;
          color: #166534;
        }

        .status.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .settings-form {
          max-width: 500px;
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

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
        }

        .update-btn {
          background: var(--primary-blue);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .update-btn:hover {
          background: var(--primary-blue-dark);
        }

        @media (max-width: 768px) {
          .dashboard-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .turfs-grid,
          .products-grid {
            grid-template-columns: 1fr;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .section-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default OwnerDashboard;