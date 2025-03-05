import { axiosInstance } from '../lib/axios.js';
import React, { useEffect, useState } from 'react';

/* import components */
import MiniPost from '../components/MiniPost';

/* import styles */
import '../styles/Home.css';

/* import function */
import displayTime from '../utils/displayTime'; 

// import assets
import TerminalIcon from "../assets/terminal.svg";
import LoadingIcon from "../assets/loading-circle.gif";
import WhiteLogo from "../assets/img/favicon-white.png";
import Logo from "../assets/img/favicon.ico";


const Home = ({ }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch 10 recent posts
  const getRecentPosts = async () => {
    try {
      const response = await axiosInstance.get('/post/recent');
      const data = response.data;
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

  const getTimeSincePost = (createdAt) => {
    const now = new Date();
    const creationTime = new Date(createdAt);
    return (now.getTime() - creationTime.getTime()) / 1000;
  };

  return (
    <div className="container">
      {/* Welcome */}
      <div className="welcome">
        <div className="Logo">
          <img src={WhiteLogo} alt="Logo"></img>  
        </div>  
        <div className="body">
          <h1>Discover the power of collaboration</h1>
          <h2>The ultimate hub for sharing, exploring, and discussing code</h2>
        </div>
      </div>
      <div className="join-forum">
        <div className="website-name">
          <img src={Logo} alt="Logo"></img>
          <h1>CodeSharing</h1>
        </div>
        <div className="join-forum-desc">
          <p>We brings together a dynamic community of coders. It's
            fast, intuitive, and designed for seamless interaction - all in one
            place.
          </p>
          <a href="/forum">Join the forum</a>
        </div>
      </div>
    </div>
  );
};

export default Home;