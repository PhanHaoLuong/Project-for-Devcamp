// import modules
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import pages
import UserAuth from './pages/UserAuth';
import UserSignUp from './pages/UserSignUp';
import Home from "./pages/Home";
import User from "./pages/User";
import Saved from "./pages/Saved";

import * as pageAddress from './pages/page-address.json';

/* import components */
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch user data from token
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/auth/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            setIsLoggedIn(true);
            setUserData(data);
          } else {
            console.error('Failed to fetch user data:', data.message);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path={pageAddress.home} element={<Home />} />
          <Route path={pageAddress.login} element={<UserAuth />} />
          <Route path={pageAddress.signup} element={<UserSignUp />} />
          <Route path={pageAddress.userProfile} element={<User userId={userData?.id} />} />
          <Route path={pageAddress.savedPosts} element={<Saved />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
