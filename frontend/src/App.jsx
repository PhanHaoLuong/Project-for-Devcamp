import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserAuth from './pages/UserAuth';
import UserSignUp from './pages/UserSignUp'
/* import './App.css' */

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<><h1 style={{color:'white'}}>homepage placeholder</h1><a href="/auth/login">login</a></>}/>
          <Route path="/auth/login" element={<UserAuth />} />
          <Route path="signup" element={<UserSignUp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
