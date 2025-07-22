import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CreditCard, 
  CheckCircle,
  ArrowLeft,
  Phone,
  Mail
} from 'lucide-react';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [bookingData, setBookingData] = useState({
    playerName: user?.name || '',
    playerEmail: user?.email || '',
    playerPhone: user?.phone || '',
    numberOfPlayers: 1,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');

  // Get turf and booking details from location state
  const { turf, slot, date } = location.state || {};

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!turf || !slot || !date) {
      toast.error('Invalid booking data');
      navigate('/turfs');
      return;
    }
  }, [isAuthenticated, turf, slot, date, navigate]);

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const booking = {
        id: Date.now(),
        turfId: turf.id,
        turfName: turf.name,
        date: date,
        slot: slot,
        playerDetails: bookingData,
        amount: slot.price,
        status: 'confirmed',
        bookingDate: new Date().toISOString()
      };

      // Save booking to localStorage (replace with actual API call)
      const existingBookings = JSON.parse(localStorage.getItem('user_bookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('user_bookings', JSON.stringify(existingBookings));

      toast.success('Booking confirmed successfully!');
      navigate('/user/dashboard', { 
        state: { 
          message: 'Your turf has been booked successfully!',
          booking: booking
        }
      });
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!turf || !slot || !date) {
    return (
      <div className="booking-error">
        <div className="container">
          <h2>Invalid Booking</h2>
          <p>Please select a turf and time slot to proceed with booking.</p>
          <button onClick={() => navigate('/turfs')} className="btn btn-primary">
            Browse Turfs
          </button>
        </div>
      </div>
    );
  }

  const bookingTotal = slot.price;
  const platformFee = Math.round(bookingTotal * 0.05); // 5% platform fee
  const taxes = Math.round((bookingTotal + platformFee) * 0.18); // 18% GST
  const finalTotal = bookingTotal + platformFee + taxes;

  return (
    <div className="booking-page">
      <div className="container">
        <div className="page-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={20} />
            Back to Turf Details
          </button>
          <h1 className="page-title">Complete Your Booking</h1>
        </div>

        <div className="booking-layout">
          {/* Booking Form */}
          <div className="booking-form-section">
            <div className="form-card">
              <h2>Booking Details</h2>
              
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label className="form-label">Player Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={20} />
                    <input
                      type="text"
                      name="playerName"
                      value={bookingData.playerName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <div className="input-wrapper">
                      <Mail className="input-icon" size={20} />
                      <input
                        type="email"
                        name="playerEmail"
                        value={bookingData.playerEmail}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <div className="input-wrapper">
                      <Phone className="input-icon" size={20} />
                      <input
                        type="tel"
                        name="playerPhone"
                        value={bookingData.playerPhone}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Players</label>
                  <select
                    name="numberOfPlayers"
                    value={bookingData.numberOfPlayers}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    {[...Array(22)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? 'Player' : 'Players'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Requests (Optional)</label>
                  <textarea
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Any special requirements or requests..."
                    rows="3"
                  />
                </div>

                <div className="payment-section">
                  <h3>Payment Method</h3>
                  <div className="payment-options">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={paymentMethod === 'online'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-option-content">
                        <CreditCard size={20} />
                        <span>Pay Online (Recommended)</span>
                      </div>
                    </label>
                    
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="venue"
                        checked={paymentMethod === 'venue'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-option-content">
                        <MapPin size={20} />
                        <span>Pay at Venue</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="booking-submit-btn"
                >
                  {loading ? (
                    <div className="btn-loading">
                      <div className="spinner"></div>
                      Processing Booking...
                    </div>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Confirm Booking
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="booking-summary">
            <div className="summary-card">
              <h2>Booking Summary</h2>
              
              <div className="turf-info">
                <img src={turf.image} alt={turf.name} className="turf-image" />
                <div className="turf-details">
                  <h3>{turf.name}</h3>
                  <div className="turf-location">
                    <MapPin size={16} />
                    <span>{turf.location}</span>
                  </div>
                </div>
              </div>

              <div className="booking-info">
                <div className="info-row">
                  <Calendar size={16} />
                  <span>Date:</span>
                  <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="info-row">
                  <Clock size={16} />
                  <span>Time:</span>
                  <span>{slot.time}</span>
                </div>
                <div className="info-row">
                  <User size={16} />
                  <span>Players:</span>
                  <span>{bookingData.numberOfPlayers}</span>
                </div>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Turf Booking</span>
                  <span>₹{bookingTotal}</span>
                </div>
                <div className="price-row">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="price-row">
                  <span>Taxes (GST 18%)</span>
                  <span>₹{taxes}</span>
                </div>
                <div className="price-divider" />
                <div className="price-row total">
                  <span>Total Amount</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              <div className="booking-policies">
                <h4>Booking Policies</h4>
                <ul>
                  <li>Free cancellation up to 2 hours before booking</li>
                  <li>50% refund for cancellations within 2 hours</li>
                  <li>Please arrive 10 minutes before your slot</li>
                  <li>Valid ID required at the venue</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .booking-page {
          padding: 2rem 0 4rem;
          min-height: 100vh;
          background: var(--gray-50);
        }

        .page-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
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

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .booking-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }

        .form-card,
        .summary-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .form-card h2,
        .summary-card h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--gray-700);
          font-size: 0.875rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-select,
        .form-textarea {
          padding-left: 1rem;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }

        .payment-section {
          margin: 2rem 0;
        }

        .payment-section h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 1rem;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .payment-option {
          display: flex;
          align-items: center;
          padding: 1rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .payment-option:hover {
          border-color: var(--primary-green);
          background: rgba(5, 150, 105, 0.05);
        }

        .payment-option input[type="radio"] {
          margin-right: 1rem;
        }

        .payment-option input[type="radio"]:checked + .payment-option-content {
          color: var(--primary-green);
        }

        .payment-option-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
        }

        .booking-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1rem;
          background: var(--primary-green);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .booking-submit-btn:hover:not(:disabled) {
          background: var(--primary-green-dark);
          transform: translateY(-1px);
        }

        .booking-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-loading {
          display: flex;
          align-items: center;
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

        .turf-info {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .turf-image {
          width: 80px;
          height: 80px;
          border-radius: 0.5rem;
          object-fit: cover;
        }

        .turf-details h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.5rem;
        }

        .turf-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .booking-info {
          margin-bottom: 2rem;
        }

        .info-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.75rem;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--gray-100);
          font-size: 0.875rem;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-row svg {
          color: var(--primary-green);
        }

        .price-breakdown {
          margin-bottom: 2rem;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          font-size: 0.875rem;
        }

        .price-row.total {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .price-divider {
          height: 1px;
          background: var(--gray-200);
          margin: 1rem 0;
        }

        .booking-policies h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.75rem;
        }

        .booking-policies ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .booking-policies li {
          padding: 0.5rem 0;
          color: var(--gray-600);
          font-size: 0.875rem;
          border-bottom: 1px solid var(--gray-100);
        }

        .booking-policies li:last-child {
          border-bottom: none;
        }

        .booking-policies li::before {
          content: "•";
          color: var(--primary-green);
          margin-right: 0.5rem;
          font-weight: bold;
        }

        .booking-error {
          padding: 4rem 0;
          text-align: center;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .booking-error h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 1rem;
        }

        .booking-error p {
          font-size: 1.125rem;
          color: var(--gray-600);
          margin-bottom: 2rem;
        }

        @media (max-width: 1024px) {
          .booking-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .turf-info {
            flex-direction: column;
            text-align: center;
          }

          .info-row {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 0.5rem;
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

export default BookingPage;