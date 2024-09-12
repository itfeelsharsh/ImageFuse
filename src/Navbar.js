import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ logoImage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`navbar ${isOpen ? 'navbar-open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          {logoImage ? (
            <img src={logoImage} alt="Logo" className="navbar-logo-image" />
          ) : (
            'UploaderPro'
          )}
        </div>
        <button className="navbar-hamburger" onClick={toggleMenu}>
          <span className="navbar-hamburger-icon"></span>
          <span className="navbar-hamburger-icon"></span>
          <span className="navbar-hamburger-icon"></span>
        </button>
        <div className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
