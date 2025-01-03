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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={pageAddress.home} element={<><h1 style={{color:'white'}}>homepage placeholder</h1><a href="/auth/login">login</a></>}/>
          <Route path={pageAddress.login} element={<UserAuth />} />
          <Route path={pageAddress.signup} element={<UserSignUp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
