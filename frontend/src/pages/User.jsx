/* import modules */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* import styles */
import "../styles/User.css";

/* import components */
import Statistics from "../components/Statistics";
import Avatar from "../components/Avatar";
import MiniPost from "../components/MiniPost";

const User = ({ }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = useParams().userId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("No userId provided. Redirecting to home...");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

  }, [userId, navigate]);

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
        <div className="posts">
          <h3>Posts</h3>
          <div className="post">
            {posts?.map((post) => {
              return (<MiniPost 
                postId={post._id}
                author={name}
                postTitle={post.title}
                postTags={null}
                postContent={post.content} />)
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
