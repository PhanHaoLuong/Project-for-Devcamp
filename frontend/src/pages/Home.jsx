import React, { useEffect, useState } from 'react';

/* import components */
import MiniPost from '../components/MiniPost'

/* import styles */
import '../styles/Home.css';

const Home = ({ }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch 10 recent posts
  const getRecentPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/post/recent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getRecentPosts();
      setPosts(posts);
      setLoading(false);
    };
  
    fetchPosts();
  }, []);

  return (
    <div className="container">
      {/* Welcome */}
      <div className="welcome">
        <div className="body">
          <h1>Welcome to CodeSharing!</h1>
          <p>
            Discover the power of collaboration with CodeSharing—the ultimate
            hub for sharing, exploring, and discussing code. Whether you're
            looking for solutions, sharing snippets, or finding inspiration,
            CodeSharing brings together a dynamic community of coders. It's
            fast, intuitive, and designed for seamless interaction—all in one
            place.
          </p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="header">
          <i className="ti-angle-right">_</i> dashboard
        </div>
        <div className="body post">
          <h1>Recent Posts</h1>
          <div className="post">
            {posts && [...posts].map((post) => (
              <MiniPost
                key={post._id}
                postId={post._id}
                author={post.author.name}
                postTitle={post.title}
                postTags={null}
                postContent={post.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
