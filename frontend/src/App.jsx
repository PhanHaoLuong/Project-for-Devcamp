// import modules
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

//import pages
import UserAuth from './pages/UserAuth';
import UserSignUp from './pages/UserSignUp'
import Home from "./pages/Home"; 
import User from "./pages/User";
import Saved from "./pages/Saved";

import * as pageAddress from './pages/page-address.json'

/* import components */
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');  
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
    
  return (
    <>
      <Router>
        <Navbar />
        {/* Render different pages based on the URL */}
        <Routes>
          <Route path={pageAddress.home} element={<><h1 style={{color:'white'}}>homepage placeholder</h1><a href="/auth/login">login</a></>}/>
          <Route path={pageAddress.login} element={<UserAuth />} />
          <Route path={pageAddress.signup} element={<UserSignUp />} />
          <Route path={pageAddress.home} element={<Home />} />
          <Route path={pageAddress.userProfile} element={<User />} />
          <Route path={pageAddress.savedPosts} element={<Saved />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;