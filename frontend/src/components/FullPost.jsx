// import modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ellipsis from "../utils/ellipsis.js";

// import components
import Avatar from "./Avatar.jsx";
import Vote from "./Vote.jsx"
import FileItem from "./FileItem.jsx";

// import assets
import HashIcon from '../assets/hash.png';
import CodeIcon from '../assets/code-symbol.svg'
import SaveIcon from '../assets/save.svg';
import ShareIcon from '../assets/share.svg';
import TerminalIcon from '../assets/terminal.svg';
import FolderIcon from '../assets/folder.svg'
import FilledSaveIcon from '../assets/save-filled.svg'
import AcceptedIcon from '../assets/tick.svg'

// import style
import '../styles/FullPost.css';

export default function FullPost({ isComment, isAccepted, postId, userId, postTitle, voteCount, postContent, codeContent, folderContent }){
    const [maxLen, setMaxLen] = useState(8);
    const [tagHoverIndex, setTagHoverIndex] = useState(null);

    const [hasCode, setHasCode] = useState(codeContent);
    const [hasFolder, setHasFolder] = useState(folderContent);
    const [isSaved, setSaved] = useState(false);
    
    // placeholder tags
    const tagArr = ['tag1', 'tag2', 'tag3', 'tag4 '.repeat(50)];

    // placeholder files
    const fileMetadataArr = [
        {fileName:"file1", fileType: "cpp" /* null if isFolder */, isFolder:false, uploadDate: Date("2024-10-26T10:30:00Z"), userId:"123"},
        {fileName: "file2", fileType: "js", isFolder: false, uploadDate: Date("2024-11-26T10:45:00Z"), userId: "124"},
        {fileName: "folder3", fileType: null, isFolder: true, uploadDate: Date("2024-12-26T11:00:00Z"), userId: "125"},
        {fileName: "file3", fileType: "py", isFolder: false, uploadDate: Date("2024-12-26T11:15:00Z"), userId: "126"},
        {fileName: "folder4", fileType: null, isFolder: true, uploadDate: Date("2024-12-26T11:30:00Z"), userId: "127"}
    ]

    fileMetadataArr.sort((a, b) => {
        if (a.isFolder) {
            return -1;
        }
        if (b.isFolder) {
            return 1;
        } else {
            return 0;
        }
    })

    return (
        <>
            <div className="app-window" id="post-window">
                {!isComment ? (
                    <div className="post-header" id="post-header">
                        <span className="header-icon">
                            <img src={TerminalIcon} alt="T"></img>
                        </span>
                        <span className="header-title">sharing</span>
                    </div>
                ) : ("")}
                <div className="title-bar">
                    <div className="title-time-container">
                        <div className="post-title">{!isComment ? (postTitle || "Sharing Title") : "Comment"}</div>
                        {!isComment ? (
                            <div className="time-since-post">0 minutes ago</div>
                        ) : ("")}
                    </div>
                    <div className="share-save-container">
                        <button className="share-button">
                            <span className="share-icon"><img src={ShareIcon} ></img></span>
                            <span className="share-title">share</span>
                        </button>
                        <button className={`${isSaved ? "saved" : "save" }-button`}
                                onClick={() => {
                                    setSaved(!isSaved);
                                }}>
                                <span className="save-icon">
                                    <img src={isSaved ? FilledSaveIcon : SaveIcon} ></img>
                                </span>
                            <span className="save-title">{isSaved ? "saved" : "save" }</span>
                        </button>
                    </div>                    
                </div>
                <div className="post-body">
                    <div className="post-properties-side">
                        <div className="post-user-container">
                            <Avatar user=""/>
                            <p className="username">username</p>
                        </div>
                        {(isComment && isAccepted) ? (
                            <div className="comment-accepted-container">
                                <span className="accepted-icon">
                                    <img src={AcceptedIcon} alt="A"></img>
                                </span>
                                <span className="accepted-text">accepted</span>
                            </div>
                        ):("")}
                        <div className="vote-container">
                            <Vote voteCount={voteCount || "N/A"}/>
                        </div>
                        {!isComment ? (
                            <div className="tag-container">
                                {tagArr.map((tag, index) => {
                                    if (tag) {
                                        return (
                                        (<div className="tag" 
                                            onMouseEnter={
                                                () => {setTagHoverIndex(index)}
                                            }
                                            onMouseLeave={
                                                () => {setTagHoverIndex(null)}
                                            }>
                                            {ellipsis(tag, (tagHoverIndex === index ? 24 : 8))}
                                        </div>)
                                        )
                                    }
                                })}
                            </div>
                        ) : ("")}
                    </div>
                    <div className="post-content">
                        <div className="desc-content">
                            <div className="content-header">
                                <span className="content-header-logo">
                                    <img src={HashIcon}></img>
                                </span>
                                <span className="content-header-text">content</span>
                            </div>
                            <div className="content-body">
                                <p>
                                    {postContent || "no content found for this post."}
                                </p>
                            </div>
                        </div>
                        {hasCode ? (
                            <div className="code">
                                <div className="code-header">
                                    <span className="code-header-logo">
                                        <img src={CodeIcon}></img>
                                    </span>
                                    <span className="code-header-text">code</span>
                                </div>
                                {/* placeholder, replace with component */}
                                <div className="code-content">
                                    <pre>
                                    <code>
                                        {'#include <iostream>;\n\nusing namespace std;\n\nint main() {\n\tcout << "Hello, World!" << endl;\n\treturn 0;\n}'}
                                    </code>
                                    </pre>
                                </div>
                            </div>
                        ) : ("")}
                        {(hasFolder ? (
                            <div className="folder">
                                <div className="folder-header">
                                    <span className="folder-header-logo">
                                        <img src={FolderIcon}></img>
                                    </span>
                                    <span className="folder-header-text">folder</span>
                                </div>
                                <div className="folder-content">
                                    {fileMetadataArr.map((file, index) => {
                                        return <FileItem 
                                                isFolder={file.isFolder}
                                                fileName={file.fileName}
                                                fileType={file.fileType}/>
                                    })}
                                </div>
                            </div>
                        ) : (""))}
                    </div>

                </div>

            </div>
        </>
    );

}

