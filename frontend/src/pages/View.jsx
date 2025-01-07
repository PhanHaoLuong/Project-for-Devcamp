/* import components */
import MiniPost from "../components/MiniPost";

const View = () => {
    return (
        <div className="dashboard"> 
            <div className="header">
            <i className="ti-angle-right"></i> Recent posts
            </div>
            <div className="body post">
                <h1>Recent Posts</h1>
                <Post />
            </div>
        </div>
    );
}

export default View;