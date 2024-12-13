import React, { useEffect, useState } from "react";
import "./assets/css/userinfo.css";
import Statistics from "./Statistics";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);

  {/* TODO: Change it to request user data from the server */}
  useEffect(() => {
    fetch("http://localhost:5000/api/user/username") 
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-info">
      <div className="header">
        <i className="ti-user"></i> user info
      </div>
      <div className="body">
        <div className="user-profile">
          <div className="profile-pic">
            {/* TODO: Request Profile picture */}
          </div>
          <div className="profile-details">
            <h3 className="username">{userData.username}</h3>
            <p className="realname">{userData.realname}</p>
            <p className="bio">{userData.bio}</p>
          </div>
        </div>
        <div className="user-stats">
          <Statistics class="stat" iconClass="ti-medall reputation" label="Reputation" value={userData.reputation} /> {/* Request reputation */}
          <Statistics class="stat" iconClass="ti-medall posts" label="Total Posts" value={userData.totalPosts} /> {/* Request total posts */}
          <Statistics class="stat" iconClass="ti-medall comments" label="Comments" value={userData.comments} /> {/* Request comments */}
          <Statistics class="stat" iconClass="ti-medall views" label="Views" value={userData.views} /> {/* Request views */}
        </div>
        <div className="contributions">
          <h3>Contributions</h3>
          <div className="contribution-item">
            <p className="title">Posts sharing: coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
