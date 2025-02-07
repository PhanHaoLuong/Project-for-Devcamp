/* import modules */
import React, { useEffect, useState } from 'react';

/* import styles */
import '../styles/Saved.css';

/* import components */
import MiniPost from '../components/MiniPost';

const Saved = ({ user }) => {
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = user._id;

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}/saved`);
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

  }, [userId]);

  const { name, savedPosts } = userData;

  const postCount = (savedPosts) ? savedPosts.length : 0;

  return (
      <div className="saved"> 
        <div className="header">
          <i className="ti-bookmark-alt"></i> saved posts
        </div>
        <div className="body post">
          <h1>Saved Posts</h1>
          <div className="post">
            {loading && <p>Loading...</p>}
            {savedPosts && [...savedPosts].reverse().map((savedPost) => (
              <MiniPost
                key={savedPost._id}
                postId={savedPost._id}
                author={name}
                postTitle={savedPost.title}
                postTags={null} 
                postContent={savedPost.content}
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