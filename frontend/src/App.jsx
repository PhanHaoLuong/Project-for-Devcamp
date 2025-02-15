// import modules
import React, { useEffect, useState, memo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { create } from 'zustand';

/* import components */
import Navbar from "./components/Navbar";

/* import pages */
import UserSignUp from "./pages/UserSignUp";
import UserAuth from "./pages/UserAuth";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import User from "./pages/User";
import Saved from "./pages/Saved";
import FullPostPage from "./pages/FullPostPage";
import CreatePost from "./pages/CreatePost";
import CreateComment from "./pages/CreateComment";
import Test from "./pages/Test";

import "./App.css";

const useAuthStore = create((set) => ({
  userData: null,
  setAuthState: (userData) => set({ userData }),
}));

const MemoizedNavbar = memo(Navbar);

function App() {
  const { userData, setAuthState } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/verify", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setAuthState(data);
        } else {
          setAuthState(null);
        }
      } catch (error) {
        console.error("Failed to verify user:", error);
        setAuthState(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [setAuthState]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      <MemoizedNavbar user={userData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={!userData ? <UserAuth /> : <Navigate to="/" />} />
        <Route path="/auth/signup" element={!userData ? <UserSignUp /> : <Navigate to="/" />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/post/:postId" element={<FullPostPage user={userData} />} />
        <Route path="/component-test" element={<Test />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/user/:userId" element={<User visitor={userData?._id} />} />
        <Route path="/user/:userId/saved" element={<Saved user={userData} />} />
        <Route path="/post/:postId/comment" element={<CreateComment />} />
      </Routes>
    </Router>
  );
}

export default App;