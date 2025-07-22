import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Clock, 
  Star,
  Plus,
  Filter,
  Search,
  Medal,
  Target
} from 'lucide-react';
import toast from 'react-hot-toast';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { isAuthenticated, isOwner } = useAuth();

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Weekend Football Tournament",
      description: "Join our exciting weekend football tournament with cash prizes and trophies for winners!",
      category: "Football",
      date: "2025-02-15",
      time: "09:00 AM",
      endDate: "2025-02-16",
      endTime: "06:00 PM",
      location: "Green Valley Sports Complex",
      address: "Sector 18, Noida",
      organizer: "Sports Arena Management",
      maxParticipants: 16,
      currentParticipants: 12,
      entryFee: 500,
      prizes: ["₹10,000", "₹5,000", "₹2,500"],
      image: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      status: "upcoming",
      registrationDeadline: "2025-02-10",
      requirements: ["Team of 11 players", "Valid ID required", "Sports shoes mandatory"]
    },
    {
      id: 2,
      title: "Cricket Championship 2025",
      description: "Annual cricket championship featuring teams from across the city. Professional umpires and live scoring.",
      category: "Cricket",
      date: "2025-02-20",
      time: "08:00 AM",
      endDate: "2025-02-22",
      endTime: "07:00 PM",
      location: "Champions Cricket Ground",
      address: "Dwarka, Delhi",
      organizer: "Delhi Cricket Association",
      maxParticipants: 8,
      currentParticipants: 6,
      entryFee: 2000,
      prizes: ["₹50,000", "₹25,000", "₹10,000"],
      image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      status: "upcoming",
      registrationDeadline: "2025-02-15",
      requirements: ["Team of 15 players", "Cricket kit required", "Experience preferred"]
    },
    {
      id: 3,
      title: "Badminton Singles Open",
      description: "Open badminton singles tournament for all skill levels. Professional courts and equipment provided.",
      category: "Badminton",
      date: "2025-01-25",
      time: "10:00 AM",
      endDate: "2025-01-25",
      endTime: "08:00 PM",
      location: "Urban Sports Complex",
      address: "Gurgaon",
      organizer: "Badminton Club Gurgaon",
      maxParticipants: 32,
      currentParticipants: 28,
      entryFee: 300,
      prizes: ["₹5,000", "₹3,000", "₹1,500"],
      image: "https://images.pexels.com/photos/1325735/pexels-photo-1325735.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      status: "ongoing",
      registrationDeadline: "2025-01-20",
      requirements: ["Individual registration", "Own racket preferred", "All levels welcome"]
    },
    {
      id: 4,
      title: "Basketball 3v3 Street Tournament",
      description: "Fast-paced 3v3 basketball tournament with music, food, and amazing prizes!",
      category: "Basketball",
      date: "2025-01-15",
      time: "02:00 PM",
      endDate: "2025-01-15",
      endTime: "09:00 PM",
      location: "Elite Basketball Court",
      address: "Vasant Kunj, Delhi",
      organizer: "Street Basketball Delhi",
      maxParticipants: 24,
      currentParticipants: 24,
      entryFee: 400,
      prizes: ["₹8,000", "₹4,000", "₹2,000"],
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      status: "completed",
      registrationDeadline: "2025-01-10",
      requirements: ["Team of 4 players (3+1 substitute)", "Basketball shoes required", "Age 16+"]
    }
  ];

  const categories = ['all', 'Football', 'Cricket', 'Basketball', 'Badminton', 'Tennis'];
  const statuses = ['all', 'upcoming', 'ongoing', 'completed'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, selectedStatus, events]);

  const handleRegister = (eventId) => {
    if (!isAuthenticated) {
      toast.error('Please login to register for events');
      return;
    }

    const event = events.find(e => e.id === eventId);
    if (event.currentParticipants >= event.maxParticipants) {
      toast.error('Event is full!');
      return;
    }

    if (event.status !== 'upcoming') {
      toast.error('Registration is not available for this event');
      return;
    }

    // Simulate registration
    toast.success(`Successfully registered for ${event.title}!`);
    
    // Update participant count
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, currentParticipants: e.currentParticipants + 1 }
        : e
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'status-upcoming';
      case 'ongoing': return 'status-ongoing';
      case 'completed': return 'status-completed';
      default: return 'status-upcoming';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return <Calendar size={16} />;
      case 'ongoing': return <Clock size={16} />;
      case 'completed': return <Trophy size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="events-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Sports Events & Tournaments</h1>
            <p className="page-description">
              Join exciting tournaments and events in your area
            </p>
          </div>
          {isOwner && (
            <button className="create-event-btn">
              <Plus size={20} />
              Create Event
            </button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Sports' : category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Events' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-section">
          <div className="section-header">
            <h2>
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
            </h2>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="no-events">
              <div className="no-events-icon">
                <Trophy size={48} />
              </div>
              <h3>No events found</h3>
              <p>Try adjusting your search criteria or check back later for new events</p>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-image-wrapper">
                    <img src={event.image} alt={event.title} className="event-image" />
                    <div className={`event-status ${getStatusColor(event.status)}`}>
                      {getStatusIcon(event.status)}
                      {event.status}
                    </div>
                    <div className="event-category">
                      {event.category}
                    </div>
                  </div>

                  <div className="event-content">
                    <div className="event-header">
                      <h3 className="event-title">{event.title}</h3>
                      <div className="event-organizer">
                        by {event.organizer}
                      </div>
                    </div>

                    <p className="event-description">{event.description}</p>

                    <div className="event-details">
                      <div className="detail-row">
                        <Calendar size={16} />
                        <span>
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                          {event.endDate !== event.date && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                        </span>
                      </div>
                      <div className="detail-row">
                        <MapPin size={16} />
                        <span>{event.location}, {event.address}</span>
                      </div>
                      <div className="detail-row">
                        <Users size={16} />
                        <span>
                          {event.currentParticipants}/{event.maxParticipants} participants
                        </span>
                      </div>
                    </div>

                    <div className="event-prizes">
                      <div className="prizes-header">
                        <Medal size={16} />
                        <span>Prizes:</span>
                      </div>
                      <div className="prizes-list">
                        {event.prizes.map((prize, index) => (
                          <span key={index} className={`prize prize-${index + 1}`}>
                            {index + 1}. {prize}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="event-footer">
                      <div className="event-fee">
                        <span className="fee-label">Entry Fee:</span>
                        <span className="fee-amount">₹{event.entryFee}</span>
                      </div>
                      
                      {event.status === 'upcoming' ? (
                        <button
                          className="register-btn"
                          onClick={() => handleRegister(event.id)}
                          disabled={event.currentParticipants >= event.maxParticipants}
                        >
                          {event.currentParticipants >= event.maxParticipants ? (
                            <>
                              <Users size={16} />
                              Event Full
                            </>
                          ) : (
                            <>
                              <Target size={16} />
                              Register Now
                            </>
                          )}
                        </button>
                      ) : event.status === 'ongoing' ? (
                        <button className="register-btn ongoing" disabled>
                          <Clock size={16} />
                          In Progress
                        </button>
                      ) : (
                        <button className="register-btn completed" disabled>
                          <Trophy size={16} />
                          Completed
                        </button>
                      )}
                    </div>

                    <div className="registration-deadline">
                      {event.status === 'upcoming' && (
                        <span>
                          Registration closes: {new Date(event.registrationDeadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .events-page {
          padding: 2rem 0 4rem;
          min-height: 80vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 0.5rem;
        }

        .page-description {
          font-size: 1.125rem;
          color: var(--gray-600);
        }

        .create-event-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--primary-green);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .create-event-btn:hover {
          background: var(--primary-green-dark);
          transform: translateY(-1px);
        }

        .search-filters {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 3rem;
        }

        .search-bar {
          position: relative;
          margin-bottom: 2rem;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.75rem;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }

        .filters {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          font-weight: 500;
          color: var(--gray-700);
          font-size: 0.875rem;
        }

        .filter-select {
          padding: 0.75rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--primary-green);
        }

        .events-section {
          margin-top: 2rem;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .events-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .event-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .event-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .event-card:hover .event-image {
          transform: scale(1.05);
        }

        .event-status {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-upcoming {
          background: var(--primary-green);
          color: white;
        }

        .status-ongoing {
          background: var(--warning);
          color: white;
        }

        .status-completed {
          background: var(--gray-600);
          color: white;
        }

        .event-category {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .event-content {
          padding: 2rem;
        }

        .event-header {
          margin-bottom: 1rem;
        }

        .event-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.5rem;
        }

        .event-organizer {
          font-size: 0.875rem;
          color: var(--gray-500);
          font-style: italic;
        }

        .event-description {
          color: var(--gray-700);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .detail-row svg {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .event-prizes {
          background: var(--gray-50);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .prizes-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--gray-800);
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .prizes-header svg {
          color: var(--warning);
        }

        .prizes-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .prize {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .prize-1 { color: #d4af37; } /* Gold */
        .prize-2 { color: #c0c0c0; } /* Silver */
        .prize-3 { color: #cd7f32; } /* Bronze */

        .event-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .event-fee {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .fee-label {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .fee-amount {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .register-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .register-btn:not(:disabled) {
          background: var(--primary-green);
          color: white;
        }

        .register-btn:not(:disabled):hover {
          background: var(--primary-green-dark);
          transform: translateY(-1px);
        }

        .register-btn:disabled {
          background: var(--gray-400);
          color: white;
          cursor: not-allowed;
        }

        .register-btn.ongoing {
          background: var(--warning);
        }

        .register-btn.completed {
          background: var(--gray-600);
        }

        .registration-deadline {
          font-size: 0.75rem;
          color: var(--gray-500);
          text-align: center;
          font-style: italic;
        }

        .no-events {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--gray-600);
        }

        .no-events-icon {
          color: var(--gray-400);
          margin-bottom: 1rem;
        }

        .no-events h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-800);
          margin-bottom: 0.5rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 1rem;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid var(--gray-200);
          border-top: 4px solid var(--primary-green);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @media (min-width: 768px) {
          .events-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .events-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .filters {
            grid-template-columns: repeat(2, 1fr);
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

export default EventsPage;