// import modules
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'

// import assets
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

//import pages
import UserAuth from './pages/UserAuth';
import UserSignUp from './pages/UserSignUp'

import * as pageAddress from './pages/page-address.json'

/* import components */
import Navbar from "./components/Navbar";

import Vote from './components/Vote';

/* import pages */
import View from "./pages/View";
import Home from "./pages/Home"; 
import User from "./pages/User";
import Saved from "./pages/Saved";
import Fileupload from './pages/File upload test';
import FullPostPage from './pages/FullPostPage';
import FileItem from './components/FileItem';
import MiniPost from './components/MiniPost';

function App() {
  // Fetch the authentication status using React Query
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/verify', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        });
        console.log('response: ', response);
        return response.json();
      } catch (error) {
        console.error('Error fetching auth user:', error);
        return { error };
      }
    },
  });

  // Define isLoggedIn based on authUser data
  const isLoggedIn = authUser && !authUser.error;

  // Show a loading state while fetching the auth status
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        {/* Render different pages based on the URL */}
        <Routes>
          <Route
            path={pageAddress.home}
            element={
              <>
                <h1 style={{ color: 'white' }}>Homepage Placeholder</h1>
                <a href="/auth/login">Login</a>
              </>
            }
          />
          <Route
            path={pageAddress.login}
            element={!isLoggedIn ? <UserAuth /> : <Navigate to="/" />}
          />
          <Route
            path={pageAddress.signup}
            element={!isLoggedIn ? <UserSignUp /> : <Navigate to="/" />}
          />
          <Route path="/" element={<View />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forum" element={<MiniPost />} />
          <Route path="/user" element={<User />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/fileupload" element={<Fileupload />} />
          <Route path="/post/:postId" element={<FullPostPage />} />
          <Route
            path="/component-test"
            element={
              <>
                <FileItem isFolder="true" />
                <FileItem />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
