import { useState, useEffect } from 'react';
import '../styles/SearchBox.css';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [postsResult, setPostsResult] = useState([]);
  const [usersResult, setUsersResult] = useState([]);
  const [error, setError] = useState(null);

  const DEBOUNCE_DELAY = 300;

  useEffect(() => {
    if (query.trim() === '') {
      setPostsResult([]);
      setUsersResult([]);
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

      const postsResult = await fetch(`http://localhost:3000/search/posts?q=${query}`);
      const usersResult = await fetch(`http://localhost:3000/search/users?q=${query}`);

      if (!postsResult.ok || !usersResult.ok) throw new Error('Failed to fetch results');

      const PostsData = await postsResult.json();
      setPostsResult(PostsData);

      const UsersData = await usersResult.json();
      setUsersResult(UsersData);
      
    } catch (err) {
      setError(err.message);
      setPostsResult([]);
      setUsersResult([]);
    }
  };

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

      <ul className="search-result posts-result">
        {postsResult.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
      
      <ul className="search-result users-result">
        {usersResult.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;