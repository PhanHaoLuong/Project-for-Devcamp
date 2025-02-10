// import modules
import React, { useEffect, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import ellipsis from "../utils/ellipsis.js";
import { ToastContainer, toast } from "react-toastify";

// import components
import Avatar from "./Avatar.jsx";
import Vote from "./Vote.jsx"
import FileItem from "./FileItem.jsx";
import Tag from './Tag.jsx';
import EditorPanel from "./EditorPanel.jsx";

// import assets
import HashIcon from '../assets/hash.png';
import CodeIcon from '../assets/code-symbol.svg'
import SaveIcon from '../assets/save.svg';
import ShareIcon from '../assets/share.svg';
import TerminalIcon from '../assets/terminal.svg';
import FolderIcon from '../assets/folder.svg'
import FilledSaveIcon from '../assets/save-filled.svg'
import AcceptedIcon from '../assets/tick.svg'
import TriangleIcon from '../assets/vote.svg';

// import style
import '../styles/FullPost.css';

export default function FullPost({ 
    postId, 
    isComment, 
    isAccepted, 
    isSaved, 
    timeSincePost, 
    author, 
    authorId,
    postTags, 
    postTitle, 
    voteCount, 
    postContent, 
    codeContent, 
    folderContent,
    user,
}){
    const [tagHoverIndex, setTagHoverIndex] = useState(null);
    const [saveButtonActive, setSaveButtonActive] = useState(false);
    const [isCodeExpanded, setIsCodeExpanded] = useState(false);

    if (folderContent){
        folderContent.sort((a, b) => {
            if (a.isFolder) {
                return -1;
            }
            if (b.isFolder) {
                return 1;
            } else {
                return 0;
            }
        })
    }

    // Copy URL to clipboard
    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("URL copied to clipboard!");
    }

    return (
        <>
            <ToastContainer />
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
                            <div className="time-since-post">{timeSincePost} ago</div>
                        ) : ("")}
                    </div>
                    {!isComment ? (
                        <div className="share-save-container">
                            <button className="share-button" onClick={copyUrl}>
                                <span className="share-icon"><img src={ShareIcon} ></img></span>
                                <span className="share-title">share</span>
                            </button>
                            <button className={`${saveButtonActive ? "saved" : "save" }-button`}
                                    onClick={() => {
                                        setSaveButtonActive(!saveButtonActive);
                                    }}>
                                    <span className="save-icon">
                                        <img src={saveButtonActive ? FilledSaveIcon : SaveIcon} ></img>
                                    </span>
                                <span className="save-title">{saveButtonActive ? "saved" : "save" }</span>
                            </button>
                        </div>
                    ) : ("")}                    
                </div>
                <div className="post-body">
                    <div className="post-properties-side">
                        <div className="post-user-container">
                            <Avatar id={authorId} name={author} />
                            <p className="username">{author}</p>
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
                            <Vote voteCount={voteCount}/>
                        </div>
                        {(!isComment && postTags) ? (
                            <div className="tag-container">
                                {postTags.map((tag, index) => {
                                    if (tag) {
                                        return <Tag tagName={ellipsis(tag, (tagHoverIndex === index ? 8 : 6))}/>
                                    }
                                })}
                            </div>
                        ) : ("")}
                    </div>
                    <div className={`${!isComment ? "post" : "comment"}-content`}>
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
                        {codeContent ? (
                            <div className="code">
                                <div className="code-header">
                                    <span className="code-header-logo">
                                        <img src={CodeIcon}></img>
                                    </span>
                                    <span className="code-header-text">code</span>
                                    {isCodeExpanded ? (
                                        <button className="code-toggle code-hidden"
                                            onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                                        >
                                            <span className="code-toggle-text">hide code</span>
                                            <span className="code-toggle-logo">
                                                <img src={TriangleIcon} 
                                                    style={{
                                                        "rotate":"0.5turn",
                                                        "transition":"all ease-in-out 0.1s"
                                                    }}
                                                >
                                                </img>
                                            </span>
                                        </button>
                                    ) : (
                                        <button className="code-toggle"
                                            onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                                        >                                         
                                            <span className="code-toggle-text">show code</span>
                                            <span className="code-toggle-logo">
                                                <img src={TriangleIcon} 
                                                    style={{
                                                        "rotate":"0.25turn",
                                                        "transition":"all ease-in-out 0.2s"
                                                    }}
                                                >
                                                </img>
                                            </span>
                                        </button>
                                    )}
                                </div>
                                    <CSSTransition
                                        in={isCodeExpanded}
                                        classNames={"code-content"}
                                        timeout={200}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <div className="code-content">
                                            <EditorPanel 
                                                codeContent={codeContent.data} 
                                                codeLanguage={codeContent.language} 
                                                lineCount={codeContent.lines} 
                                                isViewing={true}
                                            />
                                        </div>
                                    </CSSTransition>
                            </div>
                        ) : ("")}
                        {(folderContent ? (
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
                                                    fileType={file.fileType}
                                                />
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

