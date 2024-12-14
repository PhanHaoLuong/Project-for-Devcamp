// TODO: Create hamburger menu for mobile view, icon appears on the top right corner of the page, with profile pic on ít left
// TODO: Make the statistics section responsive, 1 row on desktop, 1 column on mobile
// TODO: Create smple database using MongoDB, with 1 collection named "users", each user has username, realname, bio, reputation, totalPosts, comments, views
// TODO: Create a simple API to fetch user data from the database using Node.js and Express.js
// TODO: Fetch user data from the server and display it on the page

// Static UserInfo Page
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
            <h3 className="username">username</h3> {/* Request username */}
            <p className="realname">realname</p> {/* Request realname */}
            <p className="bio">bio goes here</p> {/* Request bio */}

            {/* Change code when fetch data from server
            <h3 className="username">{username || "Loading..."}</h3>
            <p className="realname">{realname || "Anonymous"}</p>
            <p className="bio">{bio || "No bio available."}</p> */}

          </div>
        </div>
        <div className="user-stats">
          <Statistics class="stat" iconClass="ti-medall reputation" label="Reputation" value="6969" /> {/* Request reputation */}
          <Statistics class="stat" iconClass="ti-medall posts" label="Total Posts" value="666" /> {/* Request total posts */}
          <Statistics class="stat" iconClass="ti-medall comments" label="Comments" value="2024" /> {/* Request comments */}
          <Statistics class="stat" iconClass="ti-medall views" label="Views" value="255" /> {/* Request views */}
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


// UserInfo Page to fetch data from the server and display it on the page

// import React, { useEffect, useState } from "react";
// import "./assets/css/userinfo.css";
// import Statistics from "./Statistics";

// const UserInfo = () => {
//   const [userData, setUserData] = useState(null);

//   {/* TODO: Change it to request user data from the server */}
//   useEffect(() => {
//     fetch("http://localhost:5000/api/user/username") 
//       .then((response) => response.json())
//       .then((data) => setUserData(data))
//       .catch((error) => console.error("Error fetching user data:", error));
//   }, []);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="user-info">
//       <div className="header">
//         <i className="ti-user"></i> user info
//       </div>
//       <div className="body">
//         <div className="user-profile">
//           <div className="profile-pic">
//             {/* TODO: Request Profile picture */}
//           </div>
//           <div className="profile-details">
//             <h3 className="username">{userData.username}</h3>
//             <p className="realname">{userData.realname}</p>
//             <p className="bio">{userData.bio}</p>
//           </div>
//         </div>
//         <div className="user-stats">
//           <Statistics class="stat" iconClass="ti-medall reputation" label="Reputation" value={userData.reputation} /> {/* Request reputation */}
//           <Statistics class="stat" iconClass="ti-medall posts" label="Total Posts" value={userData.totalPosts} /> {/* Request total posts */}
//           <Statistics class="stat" iconClass="ti-medall comments" label="Comments" value={userData.comments} /> {/* Request comments */}
//           <Statistics class="stat" iconClass="ti-medall views" label="Views" value={userData.views} /> {/* Request views */}
//         </div>
//         <div className="contributions">
//           <h3>Contributions</h3>
//           <div className="contribution-item">
//             <p className="title">Posts sharing: coming soon...</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserInfo;
