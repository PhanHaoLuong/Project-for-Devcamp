// import modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ellipsis from "../utils/ellipsis";
import displayTimeWithUnit from "../utils/displayTime.js";

// import components
import Tag from './Tag.jsx'
import FileItem from "./FileItem";
import FullPost from "./FullPost"

// import assets
import ArrowIcon from '../assets/arrow-icon.svg'

// import style
import '../styles/Minipost.css';

export default function MiniPost({ 
    postId, 
    author, 
    timeSincePost,
    postTitle, 
    postContent, 
    postTags,
    topLevelFolder,
    voteCount,
    onClickFn,
    expandMode,
    expandData
}){
    const [isExpanded, setExpanded] = useState(false);
  
    const navigate = useNavigate();

    const onClick = onClickFn || expandMode ? (
        () => setExpanded(!isExpanded)
    ) : (
        () => navigate(`/post/${postId}`)
    );

    return (
        <>
            <div className={`minipost-container ${isExpanded ? "expanded" : ""}`} >
                <div className="header-bar" onClick={onClick}>
                    <div className="header-content">
                        <span className="header-text">
                            <p className="minipost-title">
                                {postTitle || "defaultTitle"}
                            </p>
                            <div className="minipost-meta">
                                <p className="minipost-author">{author || "defaultUser123"}・</p>
                                <p className="time-since-post">
                                    {timeSincePost? `${timeSincePost} ago` : "N/A"}
                                </p>
                            </div>
                        </span>
                    </div>
                    <div className="to-fullpost-button">
                        {expandMode ? (
                                <>
                                    <div className="on-click-annotation">
                                        {isExpanded ? "collapse post" : "expand post"}
                                    </div>
                                    <img src={ArrowIcon} alt="A"
                                        style={!isExpanded ? {
                                            "transition": "all 0.2s"
                                        } : {
                                            "transform": "rotate(0.25turn)",
                                            "transition": "all 0.2s"
                                        }}
                                    ></img>
                                </>
                            ) : (
                                <img src={ArrowIcon} alt="A"></img>
                            )
                        }
                        
                    </div>
                </div>
                <div className="minipost-description">
                    {!isExpanded ? ellipsis(postContent || "this post has no description.", 256) : expandMode && (
                        <FullPost 
                            postContent={postContent}
                            codeContent={expandData.code}
                        />
                    )}
                </div>
                {topLevelFolder ? (
                    <div className="minipost-folder">
                        <FileItem isFolder={true} fileName={topLevelFolder} />
                    </div>
                    ) : ("") 
                }
                {postTags ? (
                    <div className="minipost-tag-container">
                        {postTags.map((tag) => {
                            return <Tag tagName={tag}/>
                        })}
                    </div>
                ) : ("")}
                <div className="minipost-vote-count">
                    <span>{voteCount || 0} votes</span>
                </div>
            </div>

        </>
    );

}

