// TODO: Create smple database using MongoDB, with 1 collection named "users", each user has username, realname, bio, reputation, totalPosts, comments, views
// TODO: Create a simple API to fetch user data from the database using Node.js and Express.js
// TODO: Fetch user data from the server and display it on the page
// TODO: Change the statistics color

import React from "react";
import "../assets/css/userinfo.css";
import Statistics from "./Statistics";

const UserInfo = () => {
  return (
    <div className="user-info"> 
      <div className="header">
        <i className="ti-user"></i> user info
      </div>
      <div className="body">
        <div className="user-profile">
          <div className="profile-pic">
            {/* Request profile pic */}
          </div>
          <div className="profile-details">
            <h3 className="username">username</h3>
            <p className="realname">realname</p>
            <p className="bio">bio goes here</p>

            {/* Change code when fetch data from server
            <h3 className="username">{username || "Loading..."}</h3>
            <p className="realname">{realname || "Anonymous"}</p>
            <p className="bio">{bio || "No bio available."}</p> */}

          </div>
        </div>
        <div className="user-stats">
          {/* Handle request statistics later*/}
          <Statistics class="stat" iconClass="ti-medall reputation" label="Reputation" value="6969" color="color1" />
          <Statistics class="stat" iconClass="ti-medall posts" label="Total Posts" value="666" color="color2" />
          <Statistics class="stat" iconClass="ti-medall comments" label="Comments" value="2024" color="color3" />
          <Statistics class="stat" iconClass="ti-medall views" label="Views" value="255" color="color4" />
        </div>
        <div className="contributions">
          <h3>Contributions</h3>
          <div className="contribution-item">
            <p className="title">Posts sharing: comming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;