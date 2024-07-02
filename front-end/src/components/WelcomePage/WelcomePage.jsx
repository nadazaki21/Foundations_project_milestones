import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <nav className="navbar">
        <div className="navbar-logo">TeamWave</div>
        <div className="navbar-links">
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </nav>
      <div className="background-overlay">
        <div className="welcome-content">
          <h1>Welcome to TeamWave</h1>
          <p>Your ultimate task management solution.</p>
          <div className="auth-buttons">
            <Link to="/signup" className="auth-btn create-account-btn">Create Account</Link>
            <Link to="/login" className="auth-btn login-btn">Log In</Link>
          </div>
        </div>
        <section className="features-section">
          <h2>Why Choose TeamWave?</h2>
          <div className="features">
            <div className="feature">
              <h3>Easy to Use</h3>
              <p>Intuitive interface to manage your tasks efficiently.</p>
            </div>
            <div className="feature">
              <h3>Collaborative</h3>
              <p>Work with your team seamlessly and achieve your goals.</p>
            </div>
            <div className="feature">
              <h3>Secure</h3>
              <p>Your data is protected with top-notch security measures.</p>
            </div>
          </div>
        </section>
      </div>
      <footer className="footer">
        <p>&copy; 2024 TeamWave. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
