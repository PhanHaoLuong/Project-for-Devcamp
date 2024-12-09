import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserAuth from './pages/UserAuth';
/* import './App.css' */

function App() {
  return (
    <>
      <UserAuth />
    </>
  )
}

export default App
