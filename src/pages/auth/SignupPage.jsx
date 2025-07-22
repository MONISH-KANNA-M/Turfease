import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { User, Lock, Eye, EyeOff, MapPin, Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "user", // 'user' or 'owner'
    // Owner specific fields
    businessName: "",
    businessAddress: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.userType,
        ...(formData.userType === "owner" && {
          businessName: formData.businessName,
          businessAddress: formData.businessAddress,
        }),
      };

      const result = await signup(userData);

      if (result.success) {
        toast.success("Account created successfully!");
        // Redirect based on user type
        if (formData.userType === "owner") {
          navigate("/owner/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        toast.error(result.error || "Signup failed");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <div className="brand">
            <div className="brand-icon">
              <MapPin size={32} color="#059669" />
            </div>
            <h1 className="brand-text">TurfEase</h1>
          </div>
          <p className="signup-subtitle">
            Create your account and start playing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="user-type-selector">
            <button
              type="button"
              className={`user-type-btn ${
                formData.userType === "user" ? "active" : ""
              }`}
              onClick={() => setFormData({ ...formData, userType: "user" })}
            >
              <User size={20} />
              Player/User
            </button>
            <button
              type="button"
              className={`user-type-btn ${
                formData.userType === "owner" ? "active" : ""
              }`}
              onClick={() => setFormData({ ...formData, userType: "owner" })}
            >
              <MapPin size={20} />
              Turf Owner
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
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
              <label className="form-label">Phone Number</label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {formData.userType === "owner" && (
              <>
                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <div className="input-wrapper">
                    <MapPin className="input-icon" size={20} />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter business name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Business Address</label>
                  <div className="input-wrapper">
                    <MapPin className="input-icon" size={20} />
                    <textarea
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleChange}
                      className="form-textarea"
                      placeholder="Enter complete business address"
                      rows="3"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create password"
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

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <span className="checkmark"></span>I agree to the{" "}
              <Link to="/terms" className="link">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="link">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button type="submit" disabled={loading} className="signup-btn">
            {loading ? (
              <div className="btn-loading">
                <div className="spinner"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="signup-divider">
            <span>Already have an account?</span>
          </div>

          <Link to="/login" className="login-link">
            Sign In Instead
          </Link>
        </form>
      </div>

      <style jsx>{`
        .signup-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          padding: 2rem 1rem;
        }

        .signup-container {
          width: 100%;
          max-width: 600px;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .signup-header {
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

        .signup-subtitle {
          color: var(--gray-600);
          font-size: 1rem;
        }

        .signup-form {
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

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-weight: 500;
          color: var(--gray-700);
          font-size: 0.875rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: flex-start;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 0.875rem;
          color: var(--gray-400);
          z-index: 1;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s ease;
          font-family: inherit;
          resize: vertical;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }

        .form-textarea {
          min-height: 80px;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 0.875rem;
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
          margin: 1rem 0;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
          color: var(--gray-600);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .checkbox-label input[type="checkbox"] {
          width: 16px;
          height: 16px;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .link {
          color: var(--primary-green);
          text-decoration: none;
          font-weight: 500;
        }

        .link:hover {
          text-decoration: underline;
        }

        .signup-btn {
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

        .signup-btn:hover:not(:disabled) {
          background: var(--primary-green-dark);
          transform: translateY(-1px);
        }

        .signup-btn:disabled {
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

        .signup-divider {
          text-align: center;
          color: var(--gray-500);
          font-size: 0.875rem;
          position: relative;
          margin: 1rem 0;
        }

        .signup-divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--gray-200);
          z-index: 0;
        }

        .signup-divider span {
          background: white;
          padding: 0 1rem;
          position: relative;
          z-index: 1;
        }

        .login-link {
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

        .login-link:hover {
          background: var(--primary-green);
          color: white;
        }

        @media (min-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
