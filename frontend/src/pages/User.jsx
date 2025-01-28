import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/User.css";
import Statistics from "../components/Statistics";
import Avatar from "../components/Avatar";
import MiniPost from "../components/MiniPost";
import ChangeAvatar from "../components/ChangeAvatar";

const User = ({ visitor }) => {
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [authUser, setAuthUser] = useState(true);
  const [onEdit, setOnEdit] = useState(false);

  const userId = useParams().userId;
  const navigate = useNavigate();

  // Fetch user data
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



  // Check if the user is the authenticated user to edit the profile
  useEffect(() => {
    if (userData) {
      setAuthUser(visitor === userData._id);
    }
  }, [userData, visitor]);

  // Check user visits
  useEffect(() => {
    const updateVisits = async () => {
      if (!authUser && userData) {
        try {
          const response = await fetch(`http://localhost:3000/user/${userId}/visit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ visitorid: visitor }),
          });
          if (!response.ok) {
            throw new Error(`Failed to update visits. Status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error updating visits:", error);
        }
      }
    };
    updateVisits();
    
  }, [userData, userId, authUser, visitor]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector(".username").value;
    const realname = form.querySelector(".realname").value;
    const email = form.querySelector(".email").value;
    const bio = form.querySelector(".bio").value;

    try {
      const response = await fetch(`http://localhost:3000/user/${userId}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, realname, email, bio }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update profile. Status: ${response.status}`);
      }
      const data = await response.json();
      setUserData(data);
      setOnEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>Error loading user data</div>;

  const { _id, name, email, realname, bio, reputation, posts, comments, visits } = userData;

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

          {!onEdit &&         
          <div className="profile-details">
            <h3 className="username">{name || "Undefined"}</h3>
            <p className="realname">{realname || "Real name is not provided."}</p>
            <p className="email">{email || "Email is not provided."}</p>
            <p className="bio">{bio || "No bio."}</p>
            {authUser && <button className="editButton" onClick={() => setOnEdit(true)}>Edit profile</button>}
          </div>}
          
          {onEdit &&
          <form className="edit-profile" onSubmit={(e) => handleEditProfile(e)}>
            <div className="profileElement">
              <label htmlFor="username">Username</label>
              <input type="text" className="username" placeholder="Username" defaultValue={name} />
            </div>
            <div className="profileElement">
              <label htmlFor="realname">Real name</label>
              <input type="text" className="realname" placeholder="Real name" defaultValue={realname} />
            </div>
            {authUser &&
            <div className="profileElement">
              <label htmlFor="email">Email</label>
              <input type="email" className="email" placeholder="Email" defaultValue={email} />
            </div>}
            <div className="profileElement">
              <label htmlFor="bio">Bio</label>
              <textarea className="bio" placeholder="Bio" defaultValue={bio} />
              </div>
            <div className="profileElement control-btn">
              <button className="saveButton" type="submit">Save</button>
              <button className="cancelButton" onClick={() => setOnEdit(false)}>Cancel</button>
            </div>
          </form>}

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
            label="Visits"
            value={visits?.length || 0}
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
