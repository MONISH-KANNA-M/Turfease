import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import TurfsPage from './pages/TurfsPage';
import TurfDetailsPage from './pages/TurfDetailsPage';
import AccessoriesPage from './pages/AccessoriesPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import UserDashboard from './pages/dashboard/UserDashboard';
import OwnerDashboard from './pages/dashboard/OwnerDashboard';
import BookingPage from './pages/BookingPage';
import EventsPage from './pages/EventsPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/turfs" element={<TurfsPage />} />
              <Route path="/turf/:id" element={<TurfDetailsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/book/:id" element={<BookingPage />} />
              <Route path="/events" element={<EventsPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;