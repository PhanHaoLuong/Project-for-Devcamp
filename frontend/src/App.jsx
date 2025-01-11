// import modules
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'

import * as pageAddress from './pages/page-address.json'

/* import components */
import Navbar from "./components/Navbar";
import MiniPost from "./components/MiniPost";
import Fileupload from "./pages/File upload test";
import FileItem from "./components/FileItem";


/* import pages */
import FullPostPage from "./pages/FullPostPage";
import View from "./pages/View";
import UserSignUp from './pages/UserSignUp';
import UserAuth from './pages/UserAuth';
import Home from "./pages/Home";
import User from "./pages/User";
import Saved from "./pages/Saved";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const { data : authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/verify', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        if (response.status === 200) {
          setIsLoggedIn(true)
          return response.json()
        }
        else {
          setIsLoggedIn(false)
          return null
        }
      } catch (error) {
        return { error }
      }
    }
  })

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path={pageAddress.home} element={<><h1 style={{color:'white'}}>homepage placeholder</h1><a href="/auth/login">login</a></>}/>
          <Route path={pageAddress.login} element={!authUser ? <UserAuth /> : <Navigate to="/"/>} />
          <Route path={pageAddress.signup} element={!authUser ? <UserSignUp /> : <Navigate to="/"/>} />
          <Route path="/" element={<View />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forum" element={<MiniPost />} />
          <Route path="/user" element={<User />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/fileupload" element={<Fileupload />} />
          {/* Placeholder post route */}
          <Route path="/post/:postId" element={<FullPostPage />}/>
          <Route path="/component-test" element={<><FileItem isFolder="true"/><FileItem /></>}/>
          <Route path={pageAddress.userProfile} element={<User userId={userData?.id} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
