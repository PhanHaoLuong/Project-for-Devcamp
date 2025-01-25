import { useState, useEffect } from 'react';
import '../styles/SearchBox.css';

const SearchBox = ({ currentUser }) => {
  const [query, setQuery] = useState('');
  const [usersResult, setUsersResult] = useState([]);
  const [postsResult, setPostsResult] = useState([]);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const DEBOUNCE_DELAY = 300;

  useEffect(() => {
    if (query.trim() === '') {
      setUsersResult([]);
      setPostsResult([]);
      setIsActive(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchResults(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchResults = async (query) => {
    try {
      setError(null);

      const usersResult = await fetch(`http://localhost:3000/search/users?q=${query}`);
      const postsResult = await fetch(`http://localhost:3000/search/posts?q=${query}`);

      if (!postsResult.ok || !usersResult.ok) throw new Error('Failed to fetch results');

      const UsersData = await usersResult.json();
      setUsersResult(UsersData);

      const PostsData = await postsResult.json();
      setPostsResult(PostsData);

      setIsActive(true);
      
    } catch (err) {
      setError(err.message);
      setUsersResult([]);
      setPostsResult([]);
      setIsActive(false);
    }
  };

  console.log(currentUser);

  return (
    <div className="search-box">
      <li className="search-container">
        <i className="ti-search"></i>
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </li>
      {error && <div className="error-message">{error}</div>}
      <div className={`search-results-box ${isActive ? 'active' : ''}`}>
        <div className="search-result-section">
          <h3>Users</h3>
          <ul className="search-result users-result">
            {usersResult.map((user) => (
              <li className='search-result-item'>
                <a href={`/user/${user._id}`} className="search-result-link">
                  <i className="ti-id-badge"></i>
                  <p className="left" key={user._id}>{user.name}</p>
                  {(user._id === currentUser._id) ? <p className="note right">you</p> : <p></p>}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="search-result-section">
          <h3>Posts</h3>
          <ul className="search-result posts-result">
            {postsResult.map((post) => (
              <li className='search-result-item'>
                <a href={`/post/${post._id}`} className="search-result-link">
                  <i className="ti-layout-media-center-alt"></i>
                  <p className="left" key={post._id}>{post.title}</p>
                  <p className={`author right ${post.author.name}`}>by {(post.author._id === currentUser._id) ? 'you' : post.author.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;