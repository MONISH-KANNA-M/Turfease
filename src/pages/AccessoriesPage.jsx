import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Star,
  Plus,
  Minus,
  Heart,
  Eye,
  Package
} from 'lucide-react';
import toast from 'react-hot-toast';

const AccessoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { isAuthenticated } = useAuth();

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Professional Football",
      category: "Football",
      sport: "Football",
      price: 1200,
      originalPrice: 1500,
      rating: 4.5,
      reviews: 89,
      image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      description: "FIFA approved professional football with superior grip and durability",
      features: ["FIFA Approved", "Water Resistant", "Machine Stitched"],
      inStock: true,
      stock: 25,
      discount: 20
    },
    {
      id: 2,
      name: "Cricket Bat - Kashmir Willow",
      category: "Cricket",
      sport: "Cricket",
      price: 2500,
      originalPrice: 3000,
      rating: 4.3,
      reviews: 67,
      image: "https://images.pexels.com/photos/163452/cricket-bat-ball-game-163452.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      description: "Premium Kashmir willow cricket bat with perfect balance and power",
      features: ["Kashmir Willow", "Perfect Balance", "Professional Grade"],
      inStock: true,
      stock: 15,
      discount: 17
    },
    {
      id: 3,
      name: "Basketball - Spalding NBA",
      category: "Basketball",
      sport: "Basketball",
      price: 3200,
      originalPrice: 4000,
      rating: 4.8,
      reviews: 156,
      image: "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      description: "Official NBA basketball with excellent grip and bounce consistency",
      features: ["NBA Official", "Composite Leather", "All-Surface"],
      inStock: true,
      stock: 30,
      discount: 20
    },
    {
      id: 4,
      name: "Badminton Racket Set",
      category: "Badminton",
      sport: "Badminton",
      price: 1800,
      originalPrice: 2200,
      rating: 4.4,
      reviews: 92,
      image: "https://images.pexels.com/photos/1325735/pexels-photo-1325735.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      description: "Professional badminton racket set with shuttlecocks included",
      features: ["Carbon Fiber", "String Included", "Shuttle Pack"],
      inStock: true,
      stock: 20,
      discount: 18
    },
    {
      id: 5,
      name: "Training Cones Set (20 pcs)",
      category: "Training Equipment",
      sport: "Multi-Sport",
      price: 800,
      originalPrice: 1000,
      rating: 4.2,
      reviews: 74,
      image: "https://images.pexels.com/photos/163444/sport-tactic-cone-field-163444.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      description: "Durable plastic training cones for agility and skill training",
      features: ["20 Pieces", "Bright Colors", "Stackable Design"],
      inStock: true,
      stock: 50,
      discount: 20
    },
    {
      id: 6,
      name: "Tennis Racket - Wilson Pro",
      category: "Tennis",
      sport: "Tennis",
      price: 4500,
      originalPrice: 5500,
      rating: 4.7,
      reviews: 134,
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      description: "Professional tennis racket with excellent power and control",
      features: ["Graphite Frame", "Pro String", "Grip Included"],
      inStock: true,
      stock: 12,
      discount: 18
    },
    {
      id: 7,
      name: "Football Boots - Nike Mercurial",
      category: "Footwear",
      sport: "Football",
      price: 6500,
      originalPrice: 8000,
      rating: 4.6,
      reviews: 203,
      image: "https://images.pexels.com/photos/1598300/pexels-photo-1598300.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      description: "Professional football boots with superior grip and comfort",
      features: ["Professional Grade", "Multi-Stud", "Lightweight"],
      inStock: true,
      stock: 18,
      discount: 19
    },
    {
      id: 8,
      name: "Volleyball - Official Size",
      category: "Volleyball",
      sport: "Volleyball",
      price: 1400,
      originalPrice: 1700,
      rating: 4.3,
      reviews: 56,
      image: "https://images.pexels.com/photos/1884064/pexels-photo-1884064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      description: "Official size volleyball perfect for competitive play",
      features: ["Official Size", "Soft Touch", "Durable"],
      inStock: false,
      stock: 0,
      discount: 18
    }
  ];

  const categories = [
    'all', 'Football', 'Cricket', 'Basketball', 'Badminton', 
    'Tennis', 'Training Equipment', 'Footwear', 'Volleyball'
  ];

  const sports = ['all', 'Football', 'Cricket', 'Basketball', 'Badminton', 'Tennis', 'Multi-Sport', 'Volleyball'];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: '₹0 - ₹1,000' },
    { value: '1000-2000', label: '₹1,000 - ₹2,000' },
    { value: '2000-5000', label: '₹2,000 - ₹5,000' },
    { value: '5000+', label: '₹5,000+' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);

    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('turfease_cart') || '[]');
    const savedWishlist = JSON.parse(localStorage.getItem('turfease_wishlist') || '[]');
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by sport
    if (selectedSport !== 'all') {
      filtered = filtered.filter(product => product.sport === selectedSport);
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(p => 
        p === '' ? Infinity : parseInt(p.replace('+', ''))
      );
      filtered = filtered.filter(product => {
        if (selectedPriceRange.includes('+')) {
          return product.price >= min;
        }
        return product.price >= min && product.price <= max;
      });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedSport, selectedPriceRange, products]);

  const addToCart = (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem('turfease_cart', JSON.stringify(newCart));
    toast.success(`${product.name} added to cart!`);
  };

  const toggleWishlist = (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    const isInWishlist = wishlist.some(item => item.id === product.id);
    let newWishlist;

    if (isInWishlist) {
      newWishlist = wishlist.filter(item => item.id !== product.id);
      toast.success('Removed from wishlist');
    } else {
      newWishlist = [...wishlist, product];
      toast.success('Added to wishlist');
    }

    setWishlist(newWishlist);
    localStorage.setItem('turfease_wishlist', JSON.stringify(newWishlist));
  };

  const getCartQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading accessories...</p>
      </div>
    );
  }

  return (
    <div className="accessories-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Sports Accessories</h1>
          <p className="page-description">
            Find quality sports equipment and accessories for all your gaming needs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search for products..."
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
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

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
              <label className="filter-label">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
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
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
            </h2>
            <div className="cart-info">
              <ShoppingCart size={20} />
              <span>{cart.length} items in cart</span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <Package size={48} />
              </div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrapper">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
                    />
                    {product.discount > 0 && (
                      <div className="discount-badge">
                        -{product.discount}%
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="stock-badge out-of-stock">
                        Out of Stock
                      </div>
                    )}
                    <div className="product-actions">
                      <button 
                        className={`action-btn wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                        onClick={() => toggleWishlist(product)}
                      >
                        <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button className="action-btn view-btn">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="product-content">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                    
                    <div className="product-rating">
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <span className="rating-value">{product.rating}</span>
                      <span className="rating-count">({product.reviews})</span>
                    </div>

                    <p className="product-description">{product.description}</p>

                    <div className="product-features">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="product-price">
                      <span className="current-price">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">₹{product.originalPrice}</span>
                      )}
                    </div>

                    <div className="product-stock">
                      {product.inStock ? (
                        <span className="in-stock">✓ In Stock ({product.stock} available)</span>
                      ) : (
                        <span className="out-of-stock">✗ Out of Stock</span>
                      )}
                    </div>

                    <div className="product-footer">
                      {getCartQuantity(product.id) > 0 ? (
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => {
                              const newCart = cart.map(item =>
                                item.id === product.id 
                                  ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                                  : item
                              ).filter(item => item.quantity > 0);
                              setCart(newCart);
                              localStorage.setItem('turfease_cart', JSON.stringify(newCart));
                            }}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="quantity">{getCartQuantity(product.id)}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => {
                              if (getCartQuantity(product.id) < product.stock) {
                                const newCart = cart.map(item =>
                                  item.id === product.id 
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                                );
                                setCart(newCart);
                                localStorage.setItem('turfease_cart', JSON.stringify(newCart));
                              }
                            }}
                            disabled={getCartQuantity(product.id) >= product.stock}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="add-to-cart-btn"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </button>
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
        .accessories-page {
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .results-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .cart-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-green);
          font-weight: 500;
        }

        .products-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .product-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .product-image-wrapper {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .discount-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--error);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stock-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stock-badge.out-of-stock {
          background: var(--gray-600);
          color: white;
        }

        .product-actions {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .product-card:hover .product-actions {
          opacity: 1;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: white;
          color: var(--gray-600);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: var(--primary-green);
          color: white;
        }

        .action-btn.active {
          background: var(--primary-green);
          color: white;
        }

        .product-content {
          padding: 1.5rem;
        }

        .product-category {
          font-size: 0.75rem;
          color: var(--gray-500);
          font-weight: 500;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .product-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
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

        .product-description {
          font-size: 0.875rem;
          color: var(--gray-600);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .product-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .feature-tag {
          background: var(--gray-100);
          color: var(--gray-600);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .current-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .original-price {
          font-size: 1rem;
          color: var(--gray-500);
          text-decoration: line-through;
        }

        .product-stock {
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .in-stock {
          color: var(--success);
        }

        .out-of-stock {
          color: var(--error);
        }

        .product-footer {
          display: flex;
          justify-content: center;
        }

        .add-to-cart-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: var(--primary-green);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-to-cart-btn:hover:not(:disabled) {
          background: var(--primary-green-dark);
          transform: translateY(-1px);
        }

        .add-to-cart-btn:disabled {
          background: var(--gray-400);
          cursor: not-allowed;
          transform: none;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
        }

        .quantity-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--primary-green);
          background: white;
          color: var(--primary-green);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .quantity-btn:hover:not(:disabled) {
          background: var(--primary-green);
          color: white;
        }

        .quantity-btn:disabled {
          border-color: var(--gray-300);
          color: var(--gray-400);
          cursor: not-allowed;
        }

        .quantity {
          font-weight: 600;
          color: var(--gray-900);
          min-width: 2rem;
          text-align: center;
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

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .products-grid {
            grid-template-columns: repeat(4, 1fr);
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

export default AccessoriesPage;