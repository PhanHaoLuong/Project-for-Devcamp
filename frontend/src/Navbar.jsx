import React from "react";
import "./assets/css/navbar.css";
import "./assets/fonts/themify-icons/themify-icons.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">CodeSharing</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/home">home</a></li>
        <li><a href="/forum">forum</a></li>
        <li><a href="/help">help</a></li>
      </ul>
      <div className="navbar-actions">
        <i className="ti-search search-btn"></i>
        <i className="ti-email email-btn"></i>
        <div className="profile-circle"></div>
      </div>
    </nav>
  );
};

export default Navbar;
