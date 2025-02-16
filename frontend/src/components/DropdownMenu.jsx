import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import "../styles/DropdownMenu.css";

const DropdownMenu = ({ user, display }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className={`dropdown-menu ${display ? "show" : "hide"}`}>
      <div className="dropdown-item profile">
        <Link to={`/user/${user._id}`} className="dropdown-link">
          <Avatar id={user._id} name={user.name} />
          <span className="username">{user.name}</span>
        </Link>
      </div>
      <hr></hr>

      {/* <div className="dropdown-item">
        <Link to="/settings" className="dropdown-link">
        <i className="ti-settings"></i>
          Settings
        </Link>
      </div> */}

      <div className="dropdown-item">
        <Link to={`/user/${user._id}/saved`} className="dropdown-link"> 
        <i className="ti-bookmark-alt"></i>
          Saved posts
        </Link>
      </div>

      <div className="dropdown-item logout">
        <span className="dropdown-link" onClick={handleLogout}>
        <i className="ti-export"></i>
          Logout
        </span>
      </div>
    </div>
  );
};

export default DropdownMenu;