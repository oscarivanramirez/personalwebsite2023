import React, { useState } from 'react';
import './HamburgerIcon.css';
import { Link, useLocation } from 'react-router-dom';

function HamburgerIcon() {
  const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

  return (
    <div>
      <div 
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
      </div>
      
      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {location.pathname !== '/' && <Link to={'/'}>Home</Link>}
        {location.pathname !== '/travels' && <Link to={'/travels'}>Travels</Link>}

        {/* Add as many links as needed */}
      </div>
    </div>
  );
}

export default HamburgerIcon;
