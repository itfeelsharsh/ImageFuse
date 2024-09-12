import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2024 UploaderPro. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
