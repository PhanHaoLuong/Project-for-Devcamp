// import modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ellipsis from "../utils/ellipsis";
import displayTimeWithUnit from "../utils/displayTime.js";

// import components
import Tag from './Tag.jsx'
import FileItem from "./FileItem";

// import assets
import HashIcon from '../assets/hash.png';
import SaveIcon from '../assets/save.svg';
import ShareIcon from '../assets/share.svg';
import TerminalIcon from '../assets/terminal.svg';
import VoteIcon from '../assets/vote.svg';
import ArrowIcon from '../assets/arrow-icon.svg'

// import style
import '../styles/Minipost.css';

export default function MiniPost({ postId, author, timeSincePost, postTitle, postContent, postTags, topLevelFolder }){

    const navigate = useNavigate();

    return (
        <>
            <div className="minipost-container">
                <div className="header-bar" onClick={() => {navigate(`/post/${postId}`)}}>
                    <div className="header-content">
                        <span className="header-logo">
                            <img src={TerminalIcon} alt="T"></img>
                        </span>
                        <span className="header-text">
                            <p className="minipost-title">
                                {postTitle || "defaultTitle"}
                            </p>
                            <div className="minipost-meta">
                                <span className="minipost-author">{author || "defaultUser123"}・</span>
                                <p className="time-since-post">
                                    {timeSincePost? `${timeSincePost} ago` : "N/A"}
                                </p>
                            </div>
                        </span>
                    </div>
                    <div className="to-fullpost-button">
                        <img src={ArrowIcon} alr="A"></img>
                    </div>
                </div>
                <div className="minipost-description">
                    {ellipsis(postContent || "this post has no description.", 256) }
                </div>
                {topLevelFolder ? (
                    <div className="minipost-folder">
                        <FileItem isFolder={true} fileName={topLevelFolder} />
                    </div>
                    ) : ("") 
                }
                {postTags ? (
                    <div className="minipost-tag-container">
                        {postTags.map((tagName) => {
                            return <Tag tagName={tagName}/>
                        })}
                    </div>
                ) : ("")}
                
            </div>

        </>
    );

}

