import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  Zap, 
  Phone, 
  Mail,
  CheckCircle,
  Heart,
  Share2,
  Camera,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const TurfDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  // Mock turf data
  const mockTurf = {
    id: parseInt(id),
    name: "Green Valley Football Turf",
    location: "Sector 18, Noida",
    fullAddress: "Plot No. 45, Sector 18, Noida, Uttar Pradesh 201301",
    sport: "Football",
    rating: 4.5,
    reviews: 128,
    price: 800,
    duration: "1 hour",
    description: "Premium synthetic grass football turf with professional dimensions. Perfect for matches, training sessions, and casual games. Well-maintained facility with modern amenities.",
    images: [
      "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
    ],
    features: [
      "Professional Synthetic Grass",
      "Floodlights for Night Games",
      "Changing Rooms",
      "Parking Available",
      "Washrooms",
      "First Aid Kit",
      "Water Facility",
      "Equipment Storage"
    ],
    amenities: [
      "Parking: Free parking for 20+ vehicles",
      "Washrooms: Clean facilities with hot water",
      "Changing Rooms: Spacious rooms with lockers",
      "Canteen: Snacks and beverages available",
      "First Aid: Basic medical kit available"
    ],
    owner: {
      name: "Rahul Sports Complex",
      phone: "+91 98765 43210",
      email: "rahul@greenvalley.com",
      response_time: "Usually responds within 2 hours"
    },
    rules: [
      "No smoking or alcohol allowed",
      "Proper sports shoes mandatory",
      "Maximum 22 players per session",
      "Equipment damage charges apply",
      "Advance booking required"
    ]
  };

  // Mock available slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 6; i <= 22; i++) {
      const hour = i < 10 ? `0${i}` : i;
      const endHour = i + 1 < 10 ? `0${i + 1}` : i + 1;
      const isBooked = Math.random() < 0.3; // 30% chance of being booked
      
      slots.push({
        id: `${selectedDate}-${hour}`,
        time: `${hour}:00 - ${endHour}:00`,
        hour: i,
        price: i >= 18 ? 1000 : 800, // Evening slots are more expensive
        available: !isBooked,
        period: i < 12 ? 'Morning' : i < 18 ? 'Afternoon' : 'Evening'
      });
    }
    return slots;
  };

  const mockReviews = [
    {
      id: 1,
      user: "Arjun Kumar",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 5,
      comment: "Excellent turf quality and well-maintained facilities. The grass feels natural and the lighting is perfect for evening games.",
      date: "2025-01-10",
      helpful: 12
    },
    {
      id: 2,
      user: "Priya Sharma",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 4,
      comment: "Great place to play! Good parking and clean washrooms. Only improvement needed is in the changing rooms.",
      date: "2025-01-08",
      helpful: 8
    },
    {
      id: 3,
      user: "Vikash Gupta",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 5,
      comment: "Perfect for our weekly matches. Owner is responsive and accommodating. Highly recommended!",
      date: "2025-01-05",
      helpful: 15
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTurf(mockTurf);
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (turf) {
      setAvailableSlots(generateTimeSlots());
    }
  }, [selectedDate, turf]);

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a turf');
      navigate('/login');
      return;
    }

    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    navigate(`/book/${turf.id}`, {
      state: {
        turf,
        slot: selectedSlot,
        date: selectedDate
      }
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to leave a review');
      return;
    }

    const review = {
      id: reviews.length + 1,
      user: user.name,
      avatar: user.avatar,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
    toast.success('Review submitted successfully!');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading turf details...</p>
      </div>
    );
  }

  if (!turf) {
    return (
      <div className="error-container">
        <h2>Turf not found</h2>
        <button onClick={() => navigate('/turfs')} className="btn btn-primary">
          Back to Turfs
        </button>
      </div>
    );
  }

  return (
    <div className="turf-details-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="header-actions">
            <button 
              className={`action-btn ${isLiked ? 'liked' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button className="action-btn">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={turf.images[0]} alt={turf.name} />
            <button className="gallery-btn">
              <Camera size={16} />
              View All Photos
            </button>
          </div>
          <div className="thumbnail-images">
            {turf.images.slice(1).map((image, index) => (
              <img key={index} src={image} alt={`${turf.name} ${index + 2}`} />
            ))}
          </div>
        </div>

        <div className="content-grid">
          {/* Main Content */}
          <div className="main-content">
            <div className="turf-header">
              <div className="turf-title">
                <h1>{turf.name}</h1>
                <div className="turf-meta">
                  <div className="rating">
                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                    <span className="rating-value">{turf.rating}</span>
                    <span className="rating-count">({turf.reviews} reviews)</span>
                  </div>
                  <div className="location">
                    <MapPin size={16} />
                    <span>{turf.location}</span>
                  </div>
                </div>
              </div>
              <div className="sport-badge">
                <span>{turf.sport}</span>
              </div>
            </div>

            <div className="description-section">
              <h3>About this turf</h3>
              <p>{turf.description}</p>
            </div>

            <div className="features-section">
              <h3>Features & Amenities</h3>
              <div className="features-grid">
                {turf.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <CheckCircle size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="amenities-section">
              <h3>Detailed Amenities</h3>
              <div className="amenities-list">
                {turf.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <Zap size={16} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rules-section">
              <h3>Rules & Guidelines</h3>
              <ul className="rules-list">
                {turf.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
              <div className="reviews-header">
                <h3>Reviews ({reviews.length})</h3>
                {isAuthenticated && (
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Write Review
                  </button>
                )}
              </div>

              {showReviewForm && (
                <form className="review-form" onSubmit={handleReviewSubmit}>
                  <div className="rating-input">
                    <label>Rating:</label>
                    <div className="stars-input">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${star <= newReview.rating ? 'active' : ''}`}
                          onClick={() => setNewReview({...newReview, rating: star})}
                        >
                          <Star size={20} fill={star <= newReview.rating ? '#fbbf24' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Share your experience..."
                    className="review-textarea"
                    required
                  />
                  <div className="review-actions">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Submit Review
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline btn-sm"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <img src={review.avatar} alt={review.user} className="review-avatar" />
                      <div className="review-info">
                        <h4>{review.user}</h4>
                        <div className="review-rating">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                          ))}
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <button className="helpful-btn">
                      Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="booking-sidebar">
            <div className="booking-card">
              <div className="price-info">
                <span className="price">₹{turf.price}</span>
                <span className="duration">/{turf.duration}</span>
              </div>

              <div className="booking-form">
                <div className="date-picker">
                  <label>Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="date-input"
                  />
                </div>

                <div className="slots-section">
                  <label>Available Time Slots</label>
                  <div className="slots-grid">
                    {availableSlots.map(slot => (
                      <button
                        key={slot.id}
                        className={`slot-btn ${!slot.available ? 'unavailable' : ''} ${
                          selectedSlot?.id === slot.id ? 'selected' : ''
                        }`}
                        onClick={() => slot.available && setSelectedSlot(slot)}
                        disabled={!slot.available}
                      >
                        <div className="slot-time">{slot.time}</div>
                        <div className="slot-price">₹{slot.price}</div>
                        {!slot.available && <div className="slot-status">Booked</div>}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedSlot && (
                  <div className="booking-summary">
                    <div className="summary-row">
                      <span>Date:</span>
                      <span>{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="summary-row">
                      <span>Time:</span>
                      <span>{selectedSlot.time}</span>
                    </div>
                    <div className="summary-row">
                      <span>Duration:</span>
                      <span>{turf.duration}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>₹{selectedSlot.price}</span>
                    </div>
                  </div>
                )}

                <button
                  className="book-btn"
                  onClick={handleBooking}
                  disabled={!selectedSlot}
                >
                  <Calendar size={20} />
                  Book Now
                </button>
              </div>
            </div>

            {/* Owner Info Card */}
            <div className="owner-card">
              <h3>Contact Owner</h3>
              <div className="owner-info">
                <h4>{turf.owner.name}</h4>
                <p className="response-time">{turf.owner.response_time}</p>
                <div className="contact-methods">
                  <a href={`tel:${turf.owner.phone}`} className="contact-btn">
                    <Phone size={16} />
                    Call
                  </a>
                  <a href={`mailto:${turf.owner.email}`} className="contact-btn">
                    <Mail size={16} />
                    Email
                  </a>
                  <button className="contact-btn">
                    <MessageCircle size={16} />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .turf-details-page {
          padding: 2rem 0 4rem;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: white;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          color: var(--gray-700);
        }

        .back-btn:hover {
          border-color: var(--primary-green);
          color: var(--primary-green);
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          padding: 0.75rem;
          background: white;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--gray-600);
        }

        .action-btn:hover,
        .action-btn.liked {
          border-color: var(--primary-green);
          color: var(--primary-green);
        }

        .image-gallery {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
          height: 400px;
          border-radius: 1rem;
          overflow: hidden;
        }

        .main-image {
          position: relative;
          overflow: hidden;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gallery-btn {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .thumbnail-images {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 1rem;
        }

        .thumbnail-images img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .turf-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .turf-title h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 0.75rem;
        }

        .turf-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .rating,
        .location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-600);
        }

        .rating-value {
          font-weight: 600;
          color: var(--gray-900);
        }

        .rating-count {
          color: var(--gray-500);
        }

        .sport-badge span {
          background: var(--primary-green);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .description-section h3,
        .features-section h3,
        .amenities-section h3,
        .rules-section h3,
        .reviews-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 1rem;
        }

        .description-section p {
          color: var(--gray-700);
          line-height: 1.6;
        }

        .features-grid,
        .amenities-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 0.75rem;
        }

        .feature-item,
        .amenity-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: var(--gray-50);
          border-radius: 0.5rem;
          color: var(--gray-700);
        }

        .feature-item svg,
        .amenity-item svg {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .rules-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .rules-list li {
          padding: 0.5rem 0;
          color: var(--gray-700);
          border-bottom: 1px solid var(--gray-100);
        }

        .rules-list li::before {
          content: "•";
          color: var(--primary-green);
          margin-right: 0.5rem;
          font-weight: bold;
        }

        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .review-form {
          background: var(--gray-50);
          padding: 1.5rem;
          border-radius: 0.75rem;
          margin-bottom: 2rem;
        }

        .rating-input {
          margin-bottom: 1rem;
        }

        .rating-input label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--gray-700);
        }

        .stars-input {
          display: flex;
          gap: 0.25rem;
        }

        .star-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--gray-300);
          transition: all 0.2s ease;
        }

        .star-btn.active,
        .star-btn:hover {
          color: #fbbf24;
        }

        .review-textarea {
          width: 100%;
          min-height: 100px;
          padding: 0.75rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          font-family: inherit;
          resize: vertical;
          margin-bottom: 1rem;
        }

        .review-textarea:focus {
          outline: none;
          border-color: var(--primary-green);
        }

        .review-actions {
          display: flex;
          gap: 0.75rem;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .review-item {
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: 0.75rem;
        }

        .review-header {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .review-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .review-info h4 {
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.25rem;
        }

        .review-rating {
          display: flex;
          gap: 0.125rem;
          margin-bottom: 0.25rem;
        }

        .review-date {
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        .review-comment {
          color: var(--gray-700);
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .helpful-btn {
          background: transparent;
          border: 1px solid var(--gray-300);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          color: var(--gray-600);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .helpful-btn:hover {
          border-color: var(--primary-green);
          color: var(--primary-green);
        }

        .booking-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .booking-card,
        .owner-card {
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .price-info {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .price {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .duration {
          color: var(--gray-500);
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .date-picker label,
        .slots-section label {
          display: block;
          font-weight: 500;
          color: var(--gray-700);
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .date-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          font-size: 1rem;
        }

        .date-input:focus {
          outline: none;
          border-color: var(--primary-green);
        }

        .slots-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          max-height: 300px;
          overflow-y: auto;
        }

        .slot-btn {
          display: flex;
          flex-direction: column;
          padding: 0.75rem;
          border: 2px solid var(--gray-200);
          background: white;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .slot-btn:hover:not(:disabled) {
          border-color: var(--primary-green);
        }

        .slot-btn.selected {
          border-color: var(--primary-green);
          background: rgba(5, 150, 105, 0.1);
        }

        .slot-btn.unavailable {
          background: var(--gray-100);
          color: var(--gray-400);
          cursor: not-allowed;
        }

        .slot-time {
          font-size: 0.75rem;
          font-weight: 500;
        }

        .slot-price {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary-green);
        }

        .slot-status {
          font-size: 0.625rem;
          color: var(--error);
          text-transform: uppercase;
        }

        .booking-summary {
          background: var(--gray-50);
          padding: 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .summary-row.total {
          border-top: 1px solid var(--gray-200);
          padding-top: 0.5rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .book-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem;
          background: var(--primary-green);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .book-btn:hover:not(:disabled) {
          background: var(--primary-green-dark);
          transform: translateY(-1px);
        }

        .book-btn:disabled {
          background: var(--gray-400);
          cursor: not-allowed;
          transform: none;
        }

        .owner-card h3 {
          margin-bottom: 1rem;
          color: var(--gray-900);
        }

        .owner-info h4 {
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.5rem;
        }

        .response-time {
          font-size: 0.875rem;
          color: var(--gray-600);
          margin-bottom: 1rem;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px solid var(--primary-green);
          color: var(--primary-green);
          background: transparent;
          border-radius: 0.5rem;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .contact-btn:hover {
          background: var(--primary-green);
          color: white;
        }

        .loading-container,
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 1rem;
          text-align: center;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid var(--gray-200);
          border-top: 4px solid var(--primary-green);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .booking-sidebar {
            position: static;
          }

          .image-gallery {
            grid-template-columns: 1fr;
            height: auto;
          }

          .thumbnail-images {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 1fr;
          }
        }

        @media (max-width: 768px) {
          .turf-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .features-grid,
          .amenities-list {
            grid-template-columns: 1fr;
          }

          .page-header {
            flex-direction: column;
            gap: 1rem;
          }

          .header-actions {
            align-self: flex-end;
          }

          .slots-grid {
            grid-template-columns: 1fr;
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

export default TurfDetailsPage;