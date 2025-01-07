// import modules
import React, { useEffect, useState } from "react";

// import components
import MiniPost from "../components/MiniPost";

// import assets
import TerminalIcon from '../assets/terminal.svg';
import AddIcon from '../assets/add.svg'

// import styles
import '../styles/Forum.css';

const Forum = () => {

    return (
        <div className="page-content">
            <div className="forum-content">
                <div className="post-header" id="post-header">
                    <span className="header-icon">
                        <img src={TerminalIcon} alt="T"></img>
                    </span>
                    <span className="header-title">sharing</span>
                </div>
                <div className="post-options">
                    <button className="create-post-button">
                        <span className="create-post-button-logo">
                            <img src={AddIcon}></img>
                        </span>
                        <span className="create-post-button-title">create post</span>
                    </button>
                    <div className="post-sort-buttons">
                        <button className="sort-post-button" id="sort-by-recent">recent</button>
                        <button className="sort-post-button" id="sort-by-relevant">relevant</button>
                        <button className="sort-post-button" id="sort-by-upvotes">upvotes</button>
                    </div>
                </div>
                <div className="post-container">
                    <MiniPost
                        postId={"nutcracker69"}
                        createdAt={1111} 
                        postTags={['abc','bcd','cde']}
                        postTitle={"how to center a div"}
                        postContent={'abcde '.repeat(120)}
                        topLevelFolder="topFolder"/>
                    <MiniPost />
                    <MiniPost />
                    <MiniPost />
                </div>
            </div>
        </div>
    );
}

export default Forum;