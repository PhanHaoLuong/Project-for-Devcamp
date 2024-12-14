import React, { useState, useEffect } from "react";
import "../assets/css/navbar.css";
import "../assets/fonts/themify-icons/themify-icons.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 450);
    };

    handleResize(); // Check initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">CodeSharing</a>
      </div>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {menuOpen && (
          <>
            <li><a href="/search"><i className="ti-search"></i> search</a></li>
          </>
        )}
        <li><a href="/home">home</a></li>
        <li><a href="/forum">forum</a></li>
        <li><a href="/help">help</a></li>
        {menuOpen && (
          <>
            <li><a href="/contact"><i className="ti-email"></i> contact us</a></li>
          </>
        )}
      </ul>
      <div className="navbar-actions">
        {!menuOpen && !isSmallScreen && <i className="ti-search search-btn"></i>}
        {!menuOpen && !isSmallScreen && <i className="ti-email email-btn"></i>}
        <div className="profile-circle"></div>
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
