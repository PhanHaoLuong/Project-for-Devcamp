// import modules
import React, { useState } from "react";

//import components
import FullPost from "../components/FullPost";

// import styles
import '../styles/FullPostPage.css'
import { useParams } from "react-router-dom";


const FullPostPage = () => {    
    const [voteCount, setVoteCount] = useState(0);
    const [title, setTitle] = useState("Untitled");
    const [content, setContent] = useState("");

    const getpostID = async () => {
        const params = useParams()
        const postId = params.postId;
        try {
            const response = await fetch(`http://localhost:3000/post/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setVoteCount(data.post.votes);
            setTitle(data.post.title);
            setContent(data.post.content);
        } catch (error) {
            console.error(error);
        }
    }
    getpostID();
    return (
        /* placeholder post & comments */
        <div className="post-container">
            <FullPost isComment={false} voteCount={voteCount} postTitle={title} postContent={content}/>
            <FullPost isComment={true} isAccepted={true} voteCount={1238910} postContent={'bcd '.repeat(100)}/>
        </div>
    )
}

export default FullPostPage;