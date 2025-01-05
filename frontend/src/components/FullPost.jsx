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

// import style
import '../styles/FullPost.css';

export default function FullPost({ isComment }){
    const [maxLen, setMaxLen] = useState(8);
    const [tagHoverIndex, setTagHoverIndex] = useState(null);
    const [fileHoverIndex, setFileHoverIndex] = useState(null);
    // change to useState(false) when backend connections done
    const [hasCode, setHasCode] = useState(true);
    const [hasFolder, setHasFolder] = useState(true);
    
    const tagArr = ['tag1', 'tag2', 'tag3', 'tag4 '.repeat(50)];

    return (
        <>
            <div className="app-window" id="post-window">
                <div className="post-header" id="post-header">
                    <span className="header-icon">
                        <img src={TerminalIcon} alt="T"></img>
                    </span>
                    <span className="header-title">sharing</span>
                </div>
                <div className="title-bar">
                    <div className="title-time-container">
                        <div className="post-title">Sharing Title</div>
                        <div className="time-since-post">0 minutes ago</div>
                    </div>
                    <div className="share-save-container">
                        <button className="share-button">
                            <span className="share-icon"><img src={ShareIcon} ></img></span>
                            <span className="share-title">share</span>
                        </button>
                        <button className="save-button">
                            <span className="save-icon"><img src={SaveIcon} ></img></span>
                            <span className="save-title">save</span>
                        </button>
                    </div>                    
                </div>
                <div className="post-body">
                    <div className="post-properties-side">
                        <div className="post-user-container">
                            <Avatar user=""/>
                            <p className="username">username</p>
                        </div>
                        <div className="vote-container">
                            <Vote voteCount="1000"/>
                        </div>
                        <div className="tag-container">
                            {tagArr.map((tag, index) => {
                                if (tag) {
                                    return (
                                    <div className="tag" 
                                        onMouseEnter={
                                            () => {setTagHoverIndex(index)}
                                        }
                                        onMouseLeave={
                                            () => {setTagHoverIndex(null)}
                                        }>
                                        {ellipsis(tag, (tagHoverIndex === index ? 24 : 8))}
                                    </div>
                                    )
                                }
                            })}
                        </div>
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
                                {/* placeholder content */}
                                <p>
                                    {"abc ".repeat(100)}<br/>
                                    aaaaaaaaaaaa aaaaaaaaaaaa<br/>
                                    aaaaaaaaaaaa aaaaaaaaaaaa<br/>
                                    aaaaaaaaaaaa aaaaaaaaaaaa<br/>
                                    aaaaaaaaaaaa aaaaaaaaaaaa<br/>
                                    aaaaaaaaaaaa aaaaaaaaaaaa
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
                                    <FileItem isFolder="true"/>
                                    <FileItem />
                                    <FileItem />
                                </div>
                            </div>
                        ) : (""))}
                    </div>

                </div>

            </div>
        </>
    );

}

