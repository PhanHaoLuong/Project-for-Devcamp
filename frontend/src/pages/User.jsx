import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/User.css";
import Statistics from "../components/Statistics";
import Avatar from "../components/Avatar";
import MiniPost from "../components/MiniPost";
import ChangeAvatar from "../components/ChangeAvatar";

const User = ({ editor }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [authUser, setAuthUser] = useState(false);

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

  useEffect(() => {
    if (userData) {
      setAuthUser(editor === userData._id);
    }
  }, [userData, editor]);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>Error loading user data</div>;

  const { _id, name, realname, bio, reputation, posts, comments, views } = userData;

  return (
    <div className="user-info">
      <div className="header">
        <i className="ti-user"></i> user info
      </div>
      <div className="body">
        <div className="user-profile">

          <div 
            className={`profile-picture ${authUser ? "auth-user" : "non-auth-user"}`} 
            onClick={() => (authUser && setIsAvatarPopupOpen(true))}>
              <Avatar id={_id} name={name} />
              <i className="ti-pencil"></i>
          </div>
          
          {isAvatarPopupOpen && (
            <ChangeAvatar
              user={userData}
              isAvatarPopupOpen={isAvatarPopupOpen}
              setIsAvatarPopupOpen={setIsAvatarPopupOpen}
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
            iconClass="ti-star reputation-count"
            label="Reputation"
            value={reputation || 0}
          />
          <Statistics
            className="stat"
            iconClass="ti-write post-count"
            label="Total Posts"
            value={posts?.length || 0}
          />
          <Statistics
            className="stat"
            iconClass="ti-comments comment-count"
            label="Comments"
            value={comments || 0}
          />
          <Statistics
            className="stat"
            iconClass="ti-eye view-count"
            label="visits"
            value={visits || 0}
          />
        </div>
        <div className="posts">
          <h3>Posts</h3>
          <div className="post">
            {posts?.map((post) => {
              return (<MiniPost 
                key={post._id}
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
