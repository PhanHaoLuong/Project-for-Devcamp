// import modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ellipsis from "../utils/ellipsis.js";

// import components
import Avatar from "./Avatar.jsx";
import Vote from "./Vote.jsx"

// import assets
import HashIcon from '../assets/hash.png';
import SaveIcon from '../assets/save.svg';
import ShareIcon from '../assets/share.svg';
import TerminalIcon from '../assets/terminal.svg';


// import style
import '../styles/FullPost.css';

export default function FullPost({ isComment }){
    const tagArr = ['aaaaaaaaa', 'b', 'c'];

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
                            {tagArr.map((tag) => {
                                return (
                                    <div className="tag">{ellipsis(tag, 8)}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="post-content"></div>
                </div>

            </div>
        </>
    );

}

