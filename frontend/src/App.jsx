// import modules
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import FullPost from './components/FullPost';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* Render different pages based on the URL */}
        <Routes>
          <Route path={pageAddress.home} element={<><h1 style={{color:'white'}}>homepage placeholder</h1><a href="/auth/login">login</a></>}/>
          <Route path={pageAddress.login} element={<UserAuth />} />
          <Route path={pageAddress.signup} element={<UserSignUp />} />
          <Route path="/" element={<View />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/saved" element={<Saved />} />
          {/* Placeholder post route */}
          <Route path="/post/nutcracker69" element={<FullPost />}/>
          <Route path="/component-test" element={<Vote voteCount=""/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;