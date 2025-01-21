import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/User.css";
import Statistics from "../components/Statistics";
import Avatar from "../components/Avatar";
import MiniPost from "../components/MiniPost";
import ChangeAvatar from "../components/ChangeAvatar";

const User = ({ }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);

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

  const { _id, name, realname, bio, reputation, posts, comments, views } = userData;

  // Update avatar
  const handleAvatarUpdate = async (newAvatarUrl) => {
      try {
          const response = await fetch(`http://localhost:3000/user/${userId}/avatar`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ avatarUrl: newAvatarUrl }),
          });

          if (!response.ok) {
              throw new Error('Failed to update avatar');
          }

          const data = await response.json();
          setUser((prev) => ({ ...prev, avatar: data.avatar })); 
      } catch (error) {
          console.error("Error updating avatar:", error);
      }
  };

  
  return (
    <div className="user-info">
      <div className="header">
        <i className="ti-user"></i> user info
      </div>
      <div className="body">
        <div className="user-profile">

          <div className="profile-picture" onClick={() => setIsAvatarPopupOpen(true)}>
            <Avatar id={_id} name={name} />
            <i className="ti-pencil"></i>
          </div>
          
          {isAvatarPopupOpen && (
            <ChangeAvatar
              user={userData}
              onAvatarUpdate={handleAvatarUpdate}
              onClose={() => setIsAvatarPopupOpen(false)}
            />
          )}

          <div className="profile-details">
            <h3 className="username">{name || "Undefined"}</h3>
            <p className="realname">{realname || "Real name is not provided."}</p>
            <p className="bio">{bio || "No bio."}</p>
          </div>
        </div>

        <div className="user-stats">
          <Statistics
            className="stat"
            iconClass="ti-medall reputation-count"
            label="Reputation"
            value={reputation || 0}
          />
          <Statistics
            className="stat"
            iconClass="ti-medall post-count"
            label="Total Posts"
            value={posts?.length || 0}
          />
          <Statistics
            className="stat"
            iconClass="ti-medall comment-count"
            label="Comments"
            value={comments || 0}
          />
          <Statistics
            className="stat"
            iconClass="ti-medall view-count"
            label="Views"
            value={views || 0}
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
