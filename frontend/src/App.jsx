// import modules
import React, { useEffect, useState, memo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { ToastContainer } from "react-toastify";
import { axiosInstance } from "./lib/axios";
import "react-toastify/dist/ReactToastify.css";

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
import "./App.css";


const MemoizedNavbar = memo(Navbar);

function App() {
  const { userData, setAuthState } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axiosInstance.post("/auth/verify");
        if (response.status === 200) {
          const data = await response.data;
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
      <MemoizedNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={!userData ? <UserAuth /> : <Navigate to="/" />} />
        <Route path="/auth/signup" element={!userData ? <UserSignUp /> : <Navigate to="/" />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/post/:postId" element={<FullPostPage />} />
        <Route path="/component-test" element={<Test />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/user/:userId/saved" element={<Saved />} />
        <Route path="/post/:postId/comment" element={<CreateComment />} />
      </Routes>
      <ToastContainer theme="dark" closeOnClick stacked toastClassName={() => "custom-toast"} />
    </Router>
  );
}

export default App;