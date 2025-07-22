import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
import {
  Menu,
  X,
  User,
  ShoppingCart,
  Calendar,
  MapPin,
  Trophy,
  LogOut,
  Settings,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isAuthenticated, isOwner } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <img src={logo} alt="TurfEase" />
          </div>
          <span className="brand-text">TurfEase</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu desktop-menu">
          <Link to="/turfs" className="nav-link">
            <MapPin size={18} />
            Find Turfs
          </Link>
          <Link to="/accessories" className="nav-link">
            <ShoppingCart size={18} />
            Accessories
          </Link>
          <Link to="/events" className="nav-link">
            <Trophy size={18} />
            Events
          </Link>
        </div>

        {/* Desktop Auth Section */}
        <div className="navbar-auth desktop-auth">
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="user-avatar"
                />
                <span className="user-name">{user.name}</span>
              </button>

              {isProfileOpen && (
                <div className="dropdown-menu">
                  <Link
                    to={isOwner ? "/owner/dashboard" : "/user/dashboard"}
                    className="dropdown-item"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={16} />
                    Dashboard
                  </Link>
                  <Link
                    to="/cart"
                    className="dropdown-item"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <ShoppingCart size={16} />
                    Cart
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            <Link
              to="/turfs"
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin size={20} />
              Find Turfs
            </Link>
            <Link
              to="/accessories"
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart size={20} />
              Accessories
            </Link>
            <Link
              to="/events"
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy size={20} />
              Events
            </Link>
          </div>

          <div className="mobile-auth">
            {isAuthenticated ? (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="mobile-user-avatar"
                  />
                  <span className="mobile-user-name">{user.name}</span>
                </div>
                <div className="mobile-user-actions">
                  <Link
                    to={isOwner ? "/owner/dashboard" : "/user/dashboard"}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    Dashboard
                  </Link>
                  <Link
                    to="/cart"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart size={20} />
                    Cart
                  </Link>
                  <button
                    className="mobile-nav-link"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link
                  to="/login"
                  className="btn btn-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--gray-200);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--gray-800);
          font-weight: 700;
          font-size: 1.5rem;
          gap: 0.5rem;
        }

        .brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(5, 150, 105, 0.1);
          border-radius: 0.5rem;
        }

        .brand-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          border-radius: 50%;
        }

        .brand-text {
          color: var(--primary-green);
        }

        .navbar-menu {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--gray-600);
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: var(--primary-green);
          background: rgba(5, 150, 105, 0.05);
        }

        .navbar-auth {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-menu {
          position: relative;
        }

        .user-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          border: none;
          background: transparent;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-button:hover {
          background: var(--gray-100);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-name {
          font-weight: 500;
          color: var(--gray-700);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          overflow: hidden;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: var(--gray-700);
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }

        .dropdown-item:hover {
          background: var(--gray-50);
          color: var(--primary-green);
        }

        .auth-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .mobile-menu-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: var(--gray-600);
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-bottom: 1px solid var(--gray-200);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .mobile-nav-links {
          padding: 1rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          text-decoration: none;
          color: var(--gray-700);
          font-weight: 500;
          border: none;
          background: transparent;
          width: 100%;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover {
          color: var(--primary-green);
        }

        .mobile-auth {
          padding: 1rem;
        }

        .mobile-user-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: var(--gray-50);
          border-radius: 0.5rem;
        }

        .mobile-user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .mobile-user-name {
          font-weight: 600;
          color: var(--gray-800);
        }

        .mobile-user-actions {
          display: flex;
          flex-direction: column;
        }

        .mobile-auth-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .desktop-menu,
        .desktop-auth {
          display: flex;
        }

        @media (max-width: 768px) {
          .desktop-menu,
          .desktop-auth {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-menu.show {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
