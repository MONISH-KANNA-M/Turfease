import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Package,
  Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Mock promo codes
  const promoCodes = {
    'SAVE10': { discount: 10, minAmount: 1000 },
    'FIRST20': { discount: 20, minAmount: 2000 },
    'SPORTS15': { discount: 15, minAmount: 1500 }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('turfease_cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  }, [isAuthenticated, navigate]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === productId 
        ? { ...item, quantity: Math.min(newQuantity, item.stock) }
        : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('turfease_cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('turfease_cart', JSON.stringify(updatedCart));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('turfease_cart');
    toast.success('Cart cleared');
  };

  const applyPromoCode = () => {
    const code = promoCodes[promoCode.toUpperCase()];
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    if (!code) {
      toast.error('Invalid promo code');
      return;
    }
    
    if (subtotal < code.minAmount) {
      toast.error(`Minimum order amount of ₹${code.minAmount} required`);
      return;
    }
    
    setDiscount(code.discount);
    toast.success(`${code.discount}% discount applied!`);
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discount) / 100;
    const tax = (subtotal - discountAmount) * 0.18; // 18% GST
    const shipping = subtotal > 2000 ? 0 : 100; // Free shipping above ₹2000
    const total = subtotal - discountAmount + tax + shipping;

    return {
      subtotal,
      discountAmount,
      tax,
      shipping,
      total
    };
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    // Simulate checkout process
    navigate('/checkout', {
      state: {
        cart,
        totals: calculateTotals(),
        promoCode,
        discount
      }
    });
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingCart size={64} />
            </div>
            <h1>Your cart is empty</h1>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <div className="empty-cart-actions">
              <Link to="/accessories" className="btn btn-primary btn-lg">
                <ShoppingBag size={20} />
                Browse Accessories
              </Link>
              <Link to="/turfs" className="btn btn-outline btn-lg">
                <Package size={20} />
                Book Turf
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
          <h1 className="page-title">Shopping Cart ({cart.length} items)</h1>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-header">
              <h2>Your Items</h2>
              <button onClick={clearCart} className="clear-btn">
                <Trash2 size={16} />
                Clear All
              </button>
            </div>

            <div className="items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    <div className="item-features">
                      {item.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="item-stock">
                      {item.stock > 5 ? (
                        <span className="in-stock">In Stock</span>
                      ) : (
                        <span className="low-stock">Only {item.stock} left!</span>
                      )}
                    </div>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="item-price">
                      <span className="current-price">₹{item.price}</span>
                      <span className="total-price">₹{item.price * item.quantity}</span>
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              {/* Promo Code */}
              <div className="promo-section">
                <div className="promo-input">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-field"
                  />
                  <button onClick={applyPromoCode} className="promo-btn">
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <div className="promo-applied">
                    <span>Promo code applied: {discount}% off</span>
                  </div>
                )}
                <div className="available-codes">
                  <p>Available codes:</p>
                  <div className="code-list">
                    <span className="code">SAVE10 (10% off ₹1000+)</span>
                    <span className="code">FIRST20 (20% off ₹2000+)</span>
                    <span className="code">SPORTS15 (15% off ₹1500+)</span>
                  </div>
                </div>
              </div>

              {/* Summary Details */}
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{totals.subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{totals.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="summary-row">
                  <span>Tax (GST 18%)</span>
                  <span>₹{totals.tax.toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {totals.shipping === 0 ? (
                      <span className="free-shipping">FREE</span>
                    ) : (
                      `₹${totals.shipping}`
                    )}
                  </span>
                </div>
                
                <div className="summary-divider" />
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{totals.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button onClick={handleCheckout} className="checkout-btn">
                <CreditCard size={20} />
                Proceed to Checkout
              </button>

              {/* Security Info */}
              <div className="security-info">
                <Shield size={16} />
                <span>Secure checkout with 256-bit SSL encryption</span>
              </div>
              
              {/* Shipping Info */}
              <div className="shipping-info">
                <div className="info-item">
                  <Package size={16} />
                  <span>Free shipping on orders above ₹2000</span>
                </div>
                <div className="info-item">
                  <ShoppingBag size={16} />
                  <span>Easy returns within 7 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          padding: 2rem 0 4rem;
          min-height: 100vh;
          background: var(--gray-50);
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
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

        .cart-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }

        .cart-items {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .cart-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .clear-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid var(--error);
          color: var(--error);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }

        .clear-btn:hover {
          background: var(--error);
          color: white;
        }

        .items-list {
          display: flex;
          flex-direction: column;
        }

        .cart-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1.5rem;
          padding: 2rem;
          border-bottom: 1px solid var(--gray-200);
          align-items: start;
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .item-image {
          width: 100px;
          height: 100px;
          border-radius: 0.5rem;
          overflow: hidden;
          flex-shrink: 0;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .item-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.25rem;
        }

        .item-category {
          font-size: 0.875rem;
          color: var(--gray-500);
          font-weight: 500;
        }

        .item-features {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin: 0.5rem 0;
        }

        .feature-tag {
          background: var(--gray-100);
          color: var(--gray-600);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .item-stock {
          font-size: 0.875rem;
        }

        .in-stock {
          color: var(--success);
        }

        .low-stock {
          color: var(--warning);
          font-weight: 500;
        }

        .item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1px solid var(--gray-200);
          border-radius: 0.5rem;
          padding: 0.5rem;
        }

        .quantity-btn {
          width: 28px;
          height: 28px;
          border-radius: 0.25rem;
          border: none;
          background: var(--gray-100);
          color: var(--gray-600);
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
          background: var(--gray-200);
          color: var(--gray-400);
          cursor: not-allowed;
        }

        .quantity {
          font-weight: 600;
          color: var(--gray-900);
          min-width: 2rem;
          text-align: center;
        }

        .item-price {
          text-align: right;
        }

        .current-price {
          display: block;
          font-size: 0.875rem;
          color: var(--gray-500);
          margin-bottom: 0.25rem;
        }

        .total-price {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .remove-btn {
          padding: 0.5rem;
          background: transparent;
          border: none;
          color: var(--error);
          cursor: pointer;
          border-radius: 0.25rem;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .order-summary {
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .summary-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .summary-card h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 1.5rem;
        }

        .promo-section {
          margin-bottom: 2rem;
        }

        .promo-input {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .promo-field {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .promo-field:focus {
          outline: none;
          border-color: var(--primary-green);
        }

        .promo-btn {
          padding: 0.75rem 1rem;
          background: var(--primary-green);
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .promo-btn:hover {
          background: var(--primary-green-dark);
        }

        .promo-applied {
          background: rgba(34, 197, 94, 0.1);
          color: var(--success);
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .available-codes p {
          font-size: 0.875rem;
          color: var(--gray-600);
          margin-bottom: 0.5rem;
        }

        .code-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .code {
          font-size: 0.75rem;
          color: var(--gray-500);
          background: var(--gray-50);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }

        .summary-details {
          margin-bottom: 2rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          font-size: 0.875rem;
        }

        .summary-row.discount {
          color: var(--success);
        }

        .summary-row.total {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .summary-divider {
          height: 1px;
          background: var(--gray-200);
          margin: 1rem 0;
        }

        .free-shipping {
          color: var(--success);
          font-weight: 500;
        }

        .checkout-btn {
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
          margin-bottom: 1.5rem;
        }

        .checkout-btn:hover {
          background: var(--primary-green-dark);
          transform: translateY(-1px);
        }

        .security-info,
        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .security-info {
          justify-content: center;
          padding: 1rem 0;
          border-top: 1px solid var(--gray-200);
          margin-bottom: 1rem;
        }

        .security-info svg {
          color: var(--success);
        }

        .shipping-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .info-item svg {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .empty-cart-page {
          padding: 4rem 0;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-cart {
          text-align: center;
          max-width: 500px;
        }

        .empty-cart-icon {
          color: var(--gray-400);
          margin-bottom: 2rem;
        }

        .empty-cart h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 1rem;
        }

        .empty-cart p {
          font-size: 1.125rem;
          color: var(--gray-600);
          margin-bottom: 2rem;
        }

        .empty-cart-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
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

        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .order-summary {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .cart-item {
            grid-template-columns: 1fr;
            gap: 1rem;
            text-align: center;
          }

          .item-image {
            width: 80px;
            height: 80px;
            margin: 0 auto;
          }

          .item-actions {
            align-items: center;
          }

          .page-header {
            flex-direction: column;
            text-align: center;
          }

          .empty-cart-actions {
            flex-direction: column;
            align-items: center;
          }

          .promo-input {
            flex-direction: column;
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

export default CartPage;