import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Shield, 
  Star, 
  ArrowRight, 
  Calendar,
  Trophy,
  Users,
  CheckCircle
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <MapPin className="feature-icon" />,
      title: "Find Nearby Turfs",
      description: "Discover quality turfs in your area with real-time availability"
    },
    {
      icon: <Clock className="feature-icon" />,
      title: "Easy Booking",
      description: "Book your favorite turf slots in just a few clicks"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing with multiple options"
    },
    {
      icon: <Trophy className="feature-icon" />,
      title: "Sports Equipment",
      description: "Shop for quality sports accessories and equipment"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Cricket Team Captain",
      comment: "TurfEase made it so easy to book our regular practice slots. The platform is reliable and user-friendly!",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Football Enthusiast",
      comment: "Great selection of turfs and the equipment store has everything we need. Highly recommended!",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Turf Owner",
      comment: "As a turf owner, TurfEase has significantly increased my bookings. The dashboard is comprehensive and easy to use.",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Turfs", value: "150+", icon: <MapPin size={24} /> },
    { label: "Happy Users", value: "10K+", icon: <Users size={24} /> },
    { label: "Bookings Made", value: "50K+", icon: <Calendar size={24} /> },
    { label: "Sports Events", value: "200+", icon: <Trophy size={24} /> }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Book Your Perfect
              <span className="highlight"> Sports Turf</span>
            </h1>
            <p className="hero-description">
              Discover and book premium sports turfs in your area. From cricket pitches to football fields, 
              find the perfect venue for your game with real-time availability and instant booking.
            </p>
            <div className="hero-buttons">
              <Link to="/turfs" className="btn btn-primary btn-lg">
                Find Turfs Near You
                <ArrowRight size={20} />
              </Link>
              <Link to="/signup" className="btn btn-outline btn-lg">
                Join as Owner
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <CheckCircle className="stat-icon" />
                <span>1000+ Verified Turfs</span>
              </div>
              <div className="stat-item">
                <CheckCircle className="stat-icon" />
                <span>Instant Confirmation</span>
              </div>
              <div className="stat-item">
                <CheckCircle className="stat-icon" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" 
              alt="Sports Turf" 
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose TurfEase?</h2>
            <p className="section-description">
              Everything you need to book, play, and enjoy your favorite sports
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                {feature.icon}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-description">
              Join thousands of satisfied users who trust TurfEase
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                </div>
                <p className="testimonial-comment">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Play?</h2>
            <p className="cta-description">
              Join thousands of players who have found their perfect turf on TurfEase
            </p>
            <div className="cta-buttons">
              <Link to="/turfs" className="btn btn-primary btn-lg">
                Browse Turfs
              </Link>
              <Link to="/accessories" className="btn btn-secondary btn-lg">
                Shop Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .homepage {
          padding: 0;
        }

        .hero {
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          padding: 4rem 0;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-text {
          text-align: center;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: var(--gray-900);
        }

        .highlight {
          color: var(--primary-green);
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--gray-600);
          margin-bottom: 2rem;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .stat-icon {
          color: var(--primary-green);
        }

        .hero-image {
          display: flex;
          justify-content: center;
        }

        .hero-img {
          width: 100%;
          max-width: 600px;
          height: 400px;
          object-fit: cover;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .features {
          padding: 5rem 0;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 1rem;
        }

        .section-description {
          font-size: 1.125rem;
          color: var(--gray-600);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
          border-radius: 1rem;
          background: white;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-color: var(--primary-green);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          color: var(--primary-green);
          margin: 0 auto 1rem;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.75rem;
        }

        .feature-description {
          color: var(--gray-600);
          line-height: 1.6;
        }

        .stats {
          padding: 4rem 0;
          background: var(--gray-50);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 2rem;
          background: white;
          border-radius: 1rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .stat-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: rgba(5, 150, 105, 0.1);
          border-radius: 1rem;
          color: var(--primary-green);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--gray-900);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--gray-600);
          font-weight: 500;
        }

        .testimonials {
          padding: 5rem 0;
          background: white;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .testimonial-card {
          padding: 2rem;
          background: var(--gray-50);
          border-radius: 1rem;
          border: 1px solid var(--gray-200);
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .testimonial-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .testimonial-info {
          flex: 1;
        }

        .testimonial-name {
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.25rem;
        }

        .testimonial-role {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
        }

        .testimonial-comment {
          color: var(--gray-700);
          line-height: 1.6;
          font-style: italic;
        }

        .cta {
          padding: 5rem 0;
          background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%);
          color: white;
        }

        .cta-content {
          text-align: center;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cta-description {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-buttons .btn {
          background: white;
          color: var(--primary-green);
        }

        .cta-buttons .btn:hover {
          background: var(--gray-100);
          transform: translateY(-2px);
        }

        .cta-buttons .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid white;
        }

        .cta-buttons .btn-secondary:hover {
          background: white;
          color: var(--primary-green);
        }

        @media (min-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            text-align: left;
          }

          .hero-text {
            text-align: left;
          }

          .hero-description {
            margin-left: 0;
            margin-right: 0;
          }

          .hero-buttons {
            justify-content: flex-start;
          }

          .hero-stats {
            justify-content: flex-start;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .testimonials-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .hero-title {
            font-size: 4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;