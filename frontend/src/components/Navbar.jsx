import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import Avatar from "./Avatar";
import DropdownMenu from "./DropdownMenu";
import SearchBox from "./SearchBox";

const Navbar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
  const toggleMenu = (e) => {
    if (menuOpen && !e.target.closest(".navbar-links-container")) {
      setMenuOpen(false);
    }
  };

  const toggleDropdown = (e) => {
    if (dropdownOpen && !e.target.closest(".profile-container")) {
      setDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", toggleMenu);
  document.addEventListener("mousedown", toggleDropdown);
  
  }, [menuOpen, dropdownOpen]);

  // Check if the link is active
  const isActive = (path) => {
    const currentPath = location.pathname;
    if (path.includes(":")) {
      return currentPath.startsWith(path.split(":")[0]);
    }
    return currentPath === path;
  };
  
  return (
    <nav className="navbar">
      {/* Hamburger menu */}
      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      {/* App name */}
      <div className="navbar-logo">
        <a href="/">CodeSharing</a>
      </div>

      {/* Hamburger navbar links */}
      <div className="navbar-links-container">
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li className="link">
            <a href="/" className={isActive("/") ? "active" : ""}>
              home
            </a>
          </li>
          <li className="link">
            <a href="/forum" className={(isActive("/forum") || isActive("/post/:postId")) ? "active" : ""}>
              forum
            </a>
          </li>
          <SearchBox currentUser={user} />
        </ul>
      </div>

      {/* Dropdown menu */} 
      <div className="navbar-actions">
        {(user) ? (
          <div 
            className="profile-container" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <Avatar id={user._id} name={user.name} />
            <DropdownMenu user={user} display={dropdownOpen} />
          </div>
        ) : (
          <>
            <a href="/auth/signup" className="auth-btn signup-btn">sign up</a>
            <a href="/auth/login" className="auth-btn login-btn">login</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;