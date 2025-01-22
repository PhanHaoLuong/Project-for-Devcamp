// import modules
import React, { Suspense, useEffect, useState, useMemo } from "react";
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
import FullPostPage from "./pages/FullPostPage";
import UserSignUp from "./pages/UserSignUp";
import UserAuth from "./pages/UserAuth";
import Home from "./pages/Home";
import User from "./pages/User";
import Saved from "./pages/Saved";
import CodeEditor from "./pages/CodeEditor";
import Forum from "./pages/Forum";
import CreatePost from "./pages/CreatePost";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false); // No use of `null` to avoid undefined user data
  
  // Fetch auth user status
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/verify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",  // Send cookies
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          const data = await response.json(); 
          setUserData(data);  
          return true;
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

  const memoizedNavbar = useMemo(() => <Navbar isLoggedIn={isLoggedIn} user={userData} />, [isLoggedIn, userData]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Router>
        {memoizedNavbar}
        <Suspense fallback={<div>Loading...</div>} >
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
            <Route path="/post/:postId" element={<FullPostPage />} />
            <Route
              path="/component-test"
              element={
                <>
                  <DialogBox 
                    mode='confirm'
                    message='error lmao'
                    header='lmao stfu'
                    onConfirm={() => {console.log('lmao')}}
                  />
                </>
              }
            />
            <Route path="/post/create" element={<CreatePost />} />
            <Route
              path="/user/:userId"
              element={<User editor={userData._id} />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
