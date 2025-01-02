import Post from '../components/Post'
import '../assets/css/Home.css';

const Home = ({username, realname, bio}) => {
  return (
    <div className="container">
      {/* Welcome */}
      <div className="welcome">
        <div className="body">
          <h1>Welcome to CodeSharing!</h1>
          <p>Discover the power of collaboration with CodeSharing—the ultimate hub for sharing, exploring, and discussing code. Whether you're looking for solutions, sharing snippets, or finding inspiration, CodeSharing brings together a dynamic community of coders. It's fast, intuitive, and designed for seamless interaction—all in one place.</p>
        </div>
      </div>

     {/* Dashboard */}
      <div className="dashboard"> 
        <div className="header">
          <i className="ti-angle-right">_</i> dashboard
        </div>
        <Post />
      </div>
    </div>
  );
};

export default Home;