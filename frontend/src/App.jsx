import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./components/Navbar";
import UserInfo from "./components/UserInfo";

function App() {
  return (
    <Router>
      <Navbar />
      <UserInfo />
    </Router>
  );
}

export default App;