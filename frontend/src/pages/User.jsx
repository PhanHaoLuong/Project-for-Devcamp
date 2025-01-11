/* import modules */
import { useEffect, useState } from "react";

/* import styles */
import "../styles/User.css";

/* import components */
import Statistics from "../components/Statistics";
import Avatar from "../components/Avatar";
import MiniPost from "../components/MiniPost";

const User = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // API needs to be updated to return user data
      // User data in database should include more columns or split into multiple connected tables
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>Error loading user data</div>;

  const { name, realname, bio, reputation, posts, comments, views } = userData;

  return (
    <div className="user-info">
      <div className="header">
        <i className="ti-user"></i> user info
      </div>
      <div className="body">
        <div className="user-profile">
          <Avatar user={{ name, avatar: "" }} />
          <div className="profile-details">
            <h3 className="username">{name || "Undefined"}</h3>
            <p className="realname">{realname || "Anonymous"}</p>
            <p className="bio">{bio || "No bio."}</p>
          </div>
        </div>
        <div className="user-stats">
          <Statistics
            className="stat"
            iconClass="ti-medall reputation"
            label="Reputation"
            value={reputation || "NULL"}
            color="color1"
          />
          <Statistics
            className="stat"
            iconClass="ti-medall posts"
            label="Total Posts"
            value={posts?.length || "NULL"}
            color="color2"
          />
          <Statistics
            className="stat"
            iconClass="ti-medall comments"
            label="Comments"
            value={comments || "NULL"}
            color="color3"
          />
          <Statistics
            className="stat"
            iconClass="ti-medall views"
            label="Views"
            value={views || "NULL"}
            color="color4"
          />
        </div>
        <div className="contributions">
          <h3>Contributions</h3>
          {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;