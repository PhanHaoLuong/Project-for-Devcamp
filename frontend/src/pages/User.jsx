/* import styles */
import "../assets/css/User.css";

/* import components */
import Statistics from "../components/Statistics";
import Avatar from "../components/Avatar";
import Post from "../components/Post";

const User = ({username, realname, bio}) => {
  return (
    <div className="user-info"> 
      <div className="header">
        <i className="ti-user"></i> user info
      </div>
      <div className="body">
        <div className="user-profile">
          <Avatar user={{ name: "username", avatar: "" }} />
          <div className="profile-details">
            <h3 className="username">{username || "Undefined"}</h3>
            <p className="realname">{realname || "Anonymous"}</p>
            <p className="bio">{bio || "No bio."}</p>

          </div>
        </div>
        <div className="user-stats">
          {/* Handle request statistics later*/}
          <Statistics className="stat" iconClass="ti-medall reputation" label="Reputation" value="6969" color="color1" />
          <Statistics className="stat" iconClass="ti-medall posts" label="Total Posts" value="666" color="color2" />
          <Statistics className="stat" iconClass="ti-medall comments" label="Comments" value="2024" color="color3" />
          <Statistics className="stat" iconClass="ti-medall views" label="Views" value="255" color="color4" />
        </div>
        <div className="contributions">
          <h3>Contributions</h3>
          <Post />
        </div>
      </div>
    </div>
  );
};

export default User;