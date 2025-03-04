/* import modules */
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';

/* import styles */
import '../styles/Saved.css';

/* import components */
import MiniPost from '../components/MiniPost';

/* import function */
import displayTime from '../utils/displayTime'; 

// import assets
import LoadingIcon from "../assets/loading-circle.gif";

const Saved = ({ user }) => {
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = user._id;

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.post(`/user/${userId}/saved`);
        if (response.status !== 200) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        const data = await response.data;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();

  }, [userId]);

  const { name, savedPosts } = userData;

  const postCount = (savedPosts) ? savedPosts.length : 0;

  const getTimeSincePost = (createdAt) => {
    const now = new Date();
    const creationTime = new Date(createdAt);
    return (now.getTime() - creationTime.getTime()) / 1000;
  };

  return (
      <div className="saved"> 
        <div className="header">
          <i className="ti-bookmark-alt"></i> saved posts
        </div>
        <div className="body post">
          <h1>Saved Posts</h1>
          <div className="post">
            {loading && 
              <div className="loading-container">
                  <div className="loading-header">
                      <span className="loading-icon">
                          <img src={LoadingIcon} alt="T"></img>
                      </span>
                      <span className="loading-text">loading posts</span>
                  </div>
              </div>
            }
            {savedPosts && [...savedPosts].reverse().map((savedPost) => (
              <MiniPost
                key={savedPost._id}
                postId={savedPost._id}
                author={name}
                postTitle={savedPost.title}
                postTags={null} 
                postContent={savedPost.content}
                voteCount={savedPost.votes}
                timeSincePost={displayTime(getTimeSincePost(savedPost.createdAt))}
              />
            ))}
            {postCount === 0 && !loading && 
              <p className='box-empty'>No saved posts yet.</p>
            }
          </div>
        </div>
      </div>
  );
};

export default Saved;