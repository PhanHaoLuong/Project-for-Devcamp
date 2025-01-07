/* import styles */
import '../styles/Saved.css';

/* import components */
import MiniPost from '../components/MiniPost';

const Saved = () => {
  return (
      <div className="saved"> 
        <div className="header">
          <i className="ti-bookmark"></i> saved
        </div>
        <div className="body post">
          <h1>Saved Posts</h1>
          <Post />
        </div>
      </div>
  );
};

export default Saved;