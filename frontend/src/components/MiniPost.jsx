// import modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ellipsis from "../utils/ellipsis";

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

export default function MiniPost({ topLevelFolder }){
    const [hasFolder, setHasFolder] = useState(Boolean(topLevelFolder));

    return (
        <>
            <div className="minipost-container">
                <div className="header-bar">
                    <div className="header">
                        <span className="header-logo">
                            <img src={TerminalIcon} alt="T"></img>
                        </span>
                        <span className="header-text">
                            <p className="minipost-title">
                                sharing title
                            </p>
                            <div className="minipost-meta">
                                <span className="minipost-author">user123・</span>
                                <p className="time-since-post">
                                    0 minutes ago
                                </p>
                            </div>
                        </span>
                    </div>
                    <div className="to-fullpost-button">
                        <img src={ArrowIcon} alr="A"></img>
                    </div>
                </div>
                <div className="minipost-description">
                    {"abc ".repeat(100)}
                </div>
                <div className="minipost-folder">
                    <FileItem isFolder={true} fileName="" />
                </div>
                <div className="minipost-tag-container">
                    <Tag tagName="aaa" />
                    <Tag tagName="aaa" />
                    <Tag tagName="aaa" />
                </div>
                
            </div>

        </>
    );

}

