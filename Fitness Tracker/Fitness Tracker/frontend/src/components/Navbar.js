import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const authLinks = (
    <div className={`nav-links ${isOpen ? 'active' : ''}`}>
      <Link to="/about" onClick={closeMenu}>About Us</Link>
      <Link to="/workout" onClick={closeMenu}>Workouts</Link>
      <Link to="/meals" onClick={closeMenu}>Meals</Link>
      <Link to="/progress" onClick={closeMenu}>Progress</Link>
      <Link to="/reports" onClick={closeMenu}>Reports</Link>
      
      <div 
        onClick={() => { navigate('/profile'); closeMenu(); }}
        title="Profile" 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        {user && user.profilePicture ? (
          <img src={user.profilePicture} alt="profile" className="profile-picture" />
        ) : (
          user && user.name && (
            <div className="profile-icon" style={{ backgroundColor: '#FFBF00', color: '#000' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )
        )}
      </div>

      <a onClick={handleLogout} href="#!" style={{ cursor: 'pointer' }}>
        Logout
      </a>
    </div>
  );

  const guestLinks = (
    <div className={`nav-links ${isOpen ? 'active' : ''}`}>
      <Link to="/login" onClick={closeMenu}>Login</Link>
      <Link to="/signup" onClick={closeMenu}>Signup</Link>
    </div>
  );

  return (
    <nav className="main-navbar">
      <div className="container">
        <h1 className="nav-title">
          <Link to={isAuthenticated ? "/home" : "/"} style={{ textDecoration: 'none' }}>
            <span style={{ color: '#fff' }}>Fitness</span>{' '}
            <span style={{ color: '#FFBF00' }}>Tracker</span>
          </Link>
        </h1>
        {isAuthenticated ? authLinks : guestLinks}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;