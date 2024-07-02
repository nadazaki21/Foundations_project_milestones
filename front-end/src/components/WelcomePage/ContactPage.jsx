import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <section className="contact-info">
          <p>For any inquiries or assistance, please contact our team:</p>
          <ul>
            <li>Email: contact@teamwave.com</li>
            <li>Phone: +1 123-456-7890</li>
            <li>Address: 123 Main St, Cityville, State, Country</li>
          </ul>
        </section>
        <section className="social-media">
          <h2>Connect With Us</h2>
          <p>Follow us on social media for updates and news:</p>
          <div className="social-links">
            <a href="https://twitter.com/teamwave" className="social-link" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://www.linkedin.com/company/teamwave" className="social-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.facebook.com/teamwave" className="social-link" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
