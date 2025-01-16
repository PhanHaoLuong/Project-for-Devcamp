import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import "../styles/DropdownMenu.css";

const DropdownMenu = ({ user }) => {
  return (
    <div className="dropdown-menu">
      <div className="dropdown-item profile">
        <Link to={`/user/${user.id}`} className="dropdown-link">
          <Avatar user={user} />
          <span className="username">{user.name}</span>
        </Link>
      </div>
      <hr></hr>
      <div className="dropdown-item">
        <Link to="/settings" className="dropdown-link">
        <i className="ti-settings"></i>
          Settings
        </Link>
      </div>
      <div className="dropdown-item">
        <Link to="/auth/logout" className="dropdown-link">
        <i className="ti-power-off"></i>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default DropdownMenu;
