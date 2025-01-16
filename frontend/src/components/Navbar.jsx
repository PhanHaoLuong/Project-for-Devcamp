import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import Avatar from "./Avatar";
import DropdownMenu from "./DropdownMenu"; // Import the dropdown menu

const Navbar = ({ isLoggedIn, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu
  const location = useLocation(); // Get the current URL location

  // Ensure responsive design
  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 450;
      setIsSmallScreen(smallScreen);

      if (!smallScreen) {
        setMenuOpen(false); // Close hamburger menu on large screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      {/* App name */}
      <div className="navbar-logo">
        <a href="/">CodeSharing</a>
      </div>

      {/* Hamburger navbar links */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {menuOpen && (
          <>
            <li>
              <a href="/search" className={isActive("/search") ? "active" : ""}>
                <i className="ti-search"></i> search
              </a>
            </li>
          </>
        )}
        <li>
          <a href="/" className={isActive("/") ? "active" : ""}>
            home
          </a>
        </li>
        <li>
          <a href="/forum" className={(isActive("/forum") || isActive("/post/:postId")) ? "active" : ""}>
            forum
          </a>
        </li>
        <li>
          <a href="/help" className={isActive("/help") ? "active" : ""}>
            help
          </a>
        </li>
        {menuOpen && (
          <>
            <li>
              <a href="/contact" className={isActive("/contact") ? "active" : ""}>
                <i className="ti-email"></i> contact us
              </a>
            </li>
          </>
        )}
      </ul>

      {/* Navbar actions */}
      <div className="navbar-actions">
        {!menuOpen && !isSmallScreen && <i className="ti-search search-btn"></i>}
        {!menuOpen && !isSmallScreen && <i className="ti-email email-btn"></i>}

        {(isLoggedIn) ? (
          <div className="profile-container" onClick={toggleDropdown}>
            <Avatar user={user} />
            {dropdownOpen && <DropdownMenu user={user} />}
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
