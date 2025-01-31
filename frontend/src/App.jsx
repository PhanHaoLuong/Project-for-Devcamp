// import modules
import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import * as pageAddress from "./pages/page-address.json";

/* import components */
import Navbar from "./components/Navbar";
import MiniPost from "./components/MiniPost";
import FileItem from "./components/FileItem";
import DialogBox from "./components/DialogBox";

/* import pages */
import UserSignUp from "./pages/UserSignUp";
import UserAuth from "./pages/UserAuth";

import Home from "./pages/Home";
import User from "./pages/User";

import Saved from "./pages/Saved";
import Forum from "./pages/Forum";
import FullPostPage from "./pages/FullPostPage";

import CreatePost from "./pages/CreatePost";
import CreateComment from "./pages/CreateComment";
import Test from "./pages/Test";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/verify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          return true; //Subjected to change
        } else {
          setIsLoggedIn(false);
          return null;
        }
      } catch (error) {
        console.error("Error fetching auth user:", error);
        return { error };
      }
    },
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) return null;

  //Should optimize the way authUser is called
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>} />
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path={pageAddress.home}
            element={
              <Home />
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
          <Route path="/home" element={<Home />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/user" element={<User />} />
          <Route path="/saved" element={<Saved />} />
{/*           <Route path="/fileupload" element={<Fileupload />} /> */}
          <Route 
            path="/post/:postId" 
            element={<FullPostPage />} 
          />
          <Route
            path="/component-test"
            element={
              <>
                <Test />
              </>
            }
          />
          <Route 
            path="/post/create" 
            element={<CreatePost />} 
          />
          <Route
            path="/user/:userId"
            element={<User />}
          />
          {/* placeholder create comment route, change when appropriate */}
          <Route 
            path="/post/:postId/comment"
            element={<CreateComment />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
