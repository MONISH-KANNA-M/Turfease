import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-brand">
              <div className="brand-icon">
                <MapPin size={28} color="#059669" />
              </div>
              <span className="brand-text">TurfEase</span>
            </div>
            <p className="footer-description">
              Your one-stop platform for turf booking and sports accessories. 
              Find the perfect venue for your game and gear up with quality equipment.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/turfs">Find Turfs</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><Link to="/events">Events & Tournaments</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* For Owners */}
          <div className="footer-section">
            <h3 className="footer-heading">For Owners</h3>
            <ul className="footer-links">
              <li><Link to="/owner/register">List Your Turf</Link></li>
              <li><Link to="/owner/dashboard">Owner Dashboard</Link></li>
              <li><Link to="/owner/analytics">Analytics</Link></li>
              <li><Link to="/owner/support">Owner Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>support@turfease.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Sports Street, Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 TurfEase. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/refund">Refund Policy</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--gray-900);
          color: white;
          margin-top: 4rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1rem 1rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(5, 150, 105, 0.2);
          border-radius: 0.5rem;
        }

        .brand-text {
          color: var(--primary-green);
          font-weight: 700;
          font-size: 1.5rem;
        }

        .footer-description {
          color: var(--gray-400);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--gray-800);
          border-radius: 0.5rem;
          color: var(--gray-400);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .social-link:hover {
          background: var(--primary-green);
          color: white;
          transform: translateY(-2px);
        }

        .footer-heading {
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links a {
          color: var(--gray-400);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--primary-green);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--gray-400);
        }

        .contact-item svg {
          color: var(--primary-green);
        }

        .footer-bottom {
          border-top: 1px solid var(--gray-800);
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
        }

        .footer-legal {
          display: flex;
          gap: 1.5rem;
        }

        .footer-legal a {
          color: var(--gray-400);
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .footer-legal a:hover {
          color: var(--primary-green);
        }

        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: 2fr 1fr 1fr 1.5fr;
          }

          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        @media (min-width: 1024px) {
          .footer-container {
            padding: 4rem 2rem 2rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;