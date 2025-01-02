/* import modules */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* import components */
import Navbar from "./components/Navbar";

/* import pages */
import View from "./pages/View";
import Home from "./pages/Home"; 
import User from "./pages/User";
import Saved from "./pages/Saved";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Render different pages based on the URL */}
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </Router>
  );
}

export default App;