// import modules
import React from "react";

//import components
import FullPost from "../components/FullPost";

// import styles
import '../styles/FullPostPage.css'

const FullPostPage = () => {
    return (
        /* placeholder post & comments */
        <div className="post-container">
            <FullPost isComment={false} voteCount={7890} postContent={"abc ".repeat(100)}/>
            <FullPost isComment={true} isAccepted={true} voteCount={1238910} postContent={'bcd '.repeat(100)}/>
        </div>
    )
}

export default FullPostPage;