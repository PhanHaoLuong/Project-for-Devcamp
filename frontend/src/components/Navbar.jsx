import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/css/navbar.css";
import Avatar from "./Avatar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation(); // Get the current URL location

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 450;
      setIsSmallScreen(smallScreen);

      if (!smallScreen) {
        setMenuOpen(false);
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

  // Check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">CodeSharing</a>
      </div>
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
          <a href="/home" className={isActive("/home") ? "active" : ""}>
            home
          </a>
        </li>
        <li>
          <a href="/forum" className={isActive("/forum") ? "active" : ""}>
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
      <div className="navbar-actions">
        {!menuOpen && !isSmallScreen && <i className="ti-search search-btn"></i>}
        {!menuOpen && !isSmallScreen && <i className="ti-email email-btn"></i>}
        <a href="/user">
          <Avatar user={{ name: "test" }} />
        </a>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
