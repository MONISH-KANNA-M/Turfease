import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user' // 'user' or 'owner'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password, formData.userType);
      
      if (result.success) {
        toast.success('Login successful!');
        // Redirect based on user type
        if (formData.userType === 'owner') {
          navigate('/owner/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="brand">
            <div className="brand-icon">
              <MapPin size={32} color="#059669" />
            </div>
            <h1 className="brand-text">TurfEase</h1>
          </div>
          <p className="login-subtitle">Welcome back! Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="user-type-selector">
            <button
              type="button"
              className={`user-type-btn ${formData.userType === 'user' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, userType: 'user'})}
            >
              <User size={20} />
              Player/User
            </button>
            <button
              type="button"
              className={`user-type-btn ${formData.userType === 'owner' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, userType: 'owner'})}
            >
              <MapPin size={20} />
              Turf Owner
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading ? (
              <div className="btn-loading">
                <div className="spinner"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="login-divider">
            <span>Don't have an account?</span>
          </div>

          <Link to="/signup" className="signup-link">
            Create New Account
          </Link>
        </form>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <div className="demo-grid">
            <div className="demo-card">
              <strong>Player Account:</strong>
              <p>Email: player@demo.com</p>
              <p>Password: demo123</p>
            </div>
            <div className="demo-card">
              <strong>Owner Account:</strong>
              <p>Email: owner@demo.com</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          padding: 2rem 1rem;
        }

        .login-container {
          width: 100%;
          max-width: 420px;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: rgba(5, 150, 105, 0.1);
          border-radius: 0.75rem;
        }

        .brand-text {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .login-subtitle {
          color: var(--gray-600);
          font-size: 1rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .user-type-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .user-type-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px solid var(--gray-200);
          background: white;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .user-type-btn:hover {
          border-color: var(--primary-green);
          background: rgba(5, 150, 105, 0.05);
        }

        .user-type-btn.active {
          border-color: var(--primary-green);
          background: var(--primary-green);
          color: white;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-weight: 500;
          color: var(--gray-700);
          font-size: 0.875rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--gray-400);
          z-index: 1;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--gray-400);
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: all 0.2s ease;
        }

        .password-toggle:hover {
          color: var(--gray-600);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: var(--gray-600);
        }

        .checkbox-label input[type="checkbox"] {
          width: 16px;
          height: 16px;
        }

        .forgot-link {
          color: var(--primary-green);
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .login-btn {
          width: 100%;
          padding: 0.875rem;
          background: var(--primary-green);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .login-btn:hover:not(:disabled) {
          background: var(--primary-green-dark);
          transform: translateY(-1px);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .login-divider {
          text-align: center;
          color: var(--gray-500);
          font-size: 0.875rem;
          position: relative;
          margin: 1rem 0;
        }

        .login-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--gray-200);
          z-index: 0;
        }

        .login-divider span {
          background: white;
          padding: 0 1rem;
          position: relative;
          z-index: 1;
        }

        .signup-link {
          display: block;
          text-align: center;
          color: var(--primary-green);
          text-decoration: none;
          font-weight: 600;
          padding: 0.75rem;
          border: 2px solid var(--primary-green);
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .signup-link:hover {
          background: var(--primary-green);
          color: white;
        }

        .demo-credentials {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: 0.75rem;
          border: 1px solid var(--gray-200);
        }

        .demo-credentials h4 {
          color: var(--gray-800);
          margin-bottom: 1rem;
          text-align: center;
        }

        .demo-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .demo-card {
          background: white;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid var(--gray-200);
          font-size: 0.875rem;
        }

        .demo-card strong {
          color: var(--gray-800);
          display: block;
          margin-bottom: 0.5rem;
        }

        .demo-card p {
          margin: 0.25rem 0;
          color: var(--gray-600);
        }

        @media (min-width: 640px) {
          .demo-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;