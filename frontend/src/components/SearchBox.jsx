import { useState, useEffect } from 'react';
import { useAuthStore } from "../store/authStore";

import '../styles/SearchBox.css';

import Avatar from './Avatar';

import ellipsis from "../utils/ellipsis";
import displayTime from "../utils/displayTime";
import { axiosInstance } from '../lib/axios';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [usersResult, setUsersResult] = useState([]);
  const [postsResult, setPostsResult] = useState([]);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const DEBOUNCE_DELAY = 300;

  const currentUser = useAuthStore((state) => state.userData);

  useEffect(() => {
    const close = (e) => {
      if (isActive && !e.target.closest('.search-box')) {
        setIsActive(false);
      }
    };
  
    document.addEventListener('mousedown', close);
  
    if (query.trim() === '') {
      setUsersResult([]);
      setPostsResult([]);
      setIsActive(false);
      return () => document.removeEventListener('mousedown', close);
    }
  
    const timeoutId = setTimeout(() => {
      fetchResults(query);
    }, DEBOUNCE_DELAY);
  
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', close);
    };
  }, [query, isActive]);

  const fetchResults = async (query) => {
    try {
      setError(null);

      const usersResult = await axiosInstance.get(`/search/users?q=${query}`);
      const postsResult = await axiosInstance.get(`/search/posts?q=${query}`);
      
      if (postsResult.status !== 200 || usersResult.status !== 200) throw new Error('Failed to fetch results');

      const UsersData = await usersResult.data;
      setUsersResult(UsersData);

      const PostsData = await postsResult.data;
      setPostsResult(PostsData);
      
    } catch (err) {
      setError(err.message);
      setUsersResult([]);
      setPostsResult([]);
      setIsActive(false);
    }
  };

  const getTimeSincePost = (createdAt) => {
      const now = new Date();
      const creationTime = new Date(createdAt);
      return (now.getTime() - creationTime.getTime()) / 1000;
  };

  return (
    <div className="search-box">
      <li className="search-container">
        <i className="ti-search"></i>
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onFocus={(e) => {
            if (e.target.value.trim() !== '') {
              setIsActive(true);
            }
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsActive(true);
          }}
        />
      </li>
      {error && <div className="error-message">{error}</div>}
      <div className={`search-results-box ${isActive ? 'active' : ''}`}>
        {usersResult.length > 0 &&
          <div className="search-result-section">
            <h3>Users</h3>
            <ul className="search-result users-result">
              {usersResult.map((user) => (
                <li className='search-result-item'>
                  <a href={`/user/${user._id}`} className="search-result-link">
                    <Avatar id={user._id} name={user.name} />
                    <p className="left" key={user._id}>{user.name}</p>
                    {currentUser && (user._id === currentUser._id) ? <p className="note right">you</p> : <p></p>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
        {postsResult.length > 0 && usersResult.length > 0 && <hr />}
        {postsResult.length > 0 &&
          <div className="search-result-section">
            <h3>Posts</h3>
            <ul className="search-result posts-result">
              {postsResult.map((post) => (
                <li className='search-result-item'>
                  <a href={`/post/${post._id}`} className="search-result-link">
                    <i className="ti-layout-media-center-alt"></i>
                    <div className="content left">
                      <p className="left" key={post._id}>{post.title}</p>
                      <div className="left description">{ellipsis(post.content || "No description", 111)}</div>
                    </div>
                    <p className={`author date right ${post.author.name}`}>{(currentUser && post.author._id === currentUser._id) ? 'by you' : `by ${post.author.name}`}
                      <br /> 
                      {displayTime(getTimeSincePost(post.createdAt))} ago
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default SearchBox;