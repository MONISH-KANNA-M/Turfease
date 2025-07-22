import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Filter, 
  Search, 
  Clock, 
  Users,
  Zap,
  Calendar
} from 'lucide-react';

const TurfsPage = () => {
  const [turfs, setTurfs] = useState([]);
  const [filteredTurfs, setFilteredTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Mock data
  const mockTurfs = [
    {
      id: 1,
      name: "Green Valley Football Turf",
      location: "Sector 18, Noida",
      sport: "Football",
      rating: 4.5,
      reviews: 128,
      price: 800,
      duration: "1 hour",
      image: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      features: ["Floodlights", "Parking", "Washrooms"],
      availability: "Available Now"
    },
    {
      id: 2,
      name: "Champions Cricket Ground",
      location: "Dwarka, Delhi",
      sport: "Cricket",
      rating: 4.8,
      reviews: 256,
      price: 1200,
      duration: "3 hours",
      image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      features: ["Full Pitch", "Pavilion", "Equipment"],
      availability: "2 slots available"
    },
    {
      id: 3,
      name: "Urban Sports Complex",
      location: "Gurgaon",
      sport: "Badminton",
      rating: 4.3,
      reviews: 89,
      price: 500,
      duration: "1 hour",
      image: "https://images.pexels.com/photos/1325735/pexels-photo-1325735.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      features: ["AC Courts", "Premium Flooring", "Equipment"],
      availability: "Available Today"
    },
    {
      id: 4,
      name: "Elite Basketball Court",
      location: "Vasant Kunj, Delhi",
      sport: "Basketball",
      rating: 4.6,
      reviews: 175,
      price: 600,
      duration: "1 hour",
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      features: ["Professional Court", "Scoreboard", "Seating"],
      availability: "Available Now"
    },
    {
      id: 5,
      name: "Ace Tennis Academy",
      location: "Greater Kailash, Delhi",
      sport: "Tennis",
      rating: 4.7,
      reviews: 203,
      price: 900,
      duration: "1 hour",
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      features: ["Clay Courts", "Coaching", "Equipment Rental"],
      availability: "3 courts available"
    },
    {
      id: 6,
      name: "Metro Football Arena",
      location: "Lajpat Nagar, Delhi",
      sport: "Football",
      rating: 4.4,
      reviews: 142,
      price: 750,
      duration: "1 hour",
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      features: ["Artificial Turf", "Goals", "Ball Provided"],
      availability: "Available Today"
    }
  ];

  const sports = ['all', 'Football', 'Cricket', 'Badminton', 'Basketball', 'Tennis'];
  const locations = ['all', 'Delhi', 'Noida', 'Gurgaon'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: '₹0 - ₹500' },
    { value: '500-800', label: '₹500 - ₹800' },
    { value: '800-1200', label: '₹800 - ₹1200' },
    { value: '1200+', label: '₹1200+' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTurfs(mockTurfs);
      setFilteredTurfs(mockTurfs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = turfs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(turf =>
        turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        turf.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by sport
    if (selectedSport !== 'all') {
      filtered = filtered.filter(turf => turf.sport === selectedSport);
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(turf => 
        turf.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => 
        p === '' ? Infinity : parseInt(p.replace('+', ''))
      );
      filtered = filtered.filter(turf => {
        if (priceRange.includes('+')) {
          return turf.price >= min;
        }
        return turf.price >= min && turf.price <= max;
      });
    }

    setFilteredTurfs(filtered);
  }, [searchTerm, selectedSport, selectedLocation, priceRange, turfs]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading turfs...</p>
      </div>
    );
  }

  return (
    <div className="turfs-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Find Your Perfect Turf</h1>
          <p className="page-description">
            Discover and book premium sports turfs in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by turf name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <label className="filter-label">Sport</label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="filter-select"
              >
                {sports.map(sport => (
                  <option key={sport} value={sport}>
                    {sport === 'all' ? 'All Sports' : sport}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="filter-select"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="filter-select"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              {filteredTurfs.length} {filteredTurfs.length === 1 ? 'Turf' : 'Turfs'} Found
            </h2>
          </div>

          {filteredTurfs.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <MapPin size={48} />
              </div>
              <h3>No turfs found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="turfs-grid">
              {filteredTurfs.map(turf => (
                <div key={turf.id} className="turf-card">
                  <div className="turf-image-wrapper">
                    <img 
                      src={turf.image} 
                      alt={turf.name}
                      className="turf-image"
                    />
                    <div className="availability-badge">
                      <Zap size={14} />
                      {turf.availability}
                    </div>
                  </div>

                  <div className="turf-content">
                    <div className="turf-header">
                      <h3 className="turf-name">{turf.name}</h3>
                      <div className="turf-rating">
                        <Star size={16} fill="#fbbf24" color="#fbbf24" />
                        <span className="rating-value">{turf.rating}</span>
                        <span className="rating-count">({turf.reviews})</span>
                      </div>
                    </div>

                    <div className="turf-location">
                      <MapPin size={16} />
                      <span>{turf.location}</span>
                    </div>

                    <div className="turf-sport">
                      <span className="sport-badge">{turf.sport}</span>
                    </div>

                    <div className="turf-features">
                      {turf.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="turf-footer">
                      <div className="turf-price">
                        <span className="price">₹{turf.price}</span>
                        <span className="duration">/{turf.duration}</span>
                      </div>
                      <Link 
                        to={`/turf/${turf.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <Calendar size={16} />
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .turfs-page {
          padding: 2rem 0 4rem;
          min-height: 80vh;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
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
          grid-template-columns: 1fr;
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

        .results-section {
          margin-top: 2rem;
        }

        .results-header {
          margin-bottom: 2rem;
        }

        .results-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .turfs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .turf-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .turf-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .turf-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .turf-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .turf-card:hover .turf-image {
          transform: scale(1.05);
        }

        .availability-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--success);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .turf-content {
          padding: 1.5rem;
        }

        .turf-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .turf-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-900);
          flex: 1;
          min-width: 0;
        }

        .turf-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex-shrink: 0;
        }

        .rating-value {
          font-weight: 600;
          color: var(--gray-900);
          font-size: 0.875rem;
        }

        .rating-count {
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        .turf-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-600);
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .turf-sport {
          margin-bottom: 1rem;
        }

        .sport-badge {
          display: inline-block;
          background: var(--primary-green);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .turf-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .feature-tag {
          background: var(--gray-100);
          color: var(--gray-600);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
        }

        .turf-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .turf-price {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .duration {
          font-size: 0.875rem;
          color: var(--gray-500);
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--gray-600);
        }

        .no-results-icon {
          color: var(--gray-400);
          margin-bottom: 1rem;
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
          .filters {
            grid-template-columns: repeat(3, 1fr);
          }

          .turfs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .turfs-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default TurfsPage;