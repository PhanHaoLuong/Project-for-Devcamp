import Post from "../components/Post";

const View = () => {
    return (
        <div className="dashboard"> 
            <div className="header">
            <i className="ti-angle-right">_</i> Recent posts
            </div>
            <Post />
        </div>
    );
}

export default View;