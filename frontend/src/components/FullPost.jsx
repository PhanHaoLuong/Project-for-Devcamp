// import modules
import React, { useEffect, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import ellipsis from "../utils/ellipsis.js";
import { toast } from "react-toastify";

// import components
import Avatar from "./Avatar.jsx";
import Vote from "./Vote.jsx";
import FileItem from "./FileItem.jsx";
import Tag from './Tag.jsx';
import CodeViewer from "./CodeViewer.jsx";
import FileUpload from "./FileUpload.jsx";

// import assets
import HashIcon from '../assets/hash.png';
import CodeIcon from '../assets/code-symbol.svg';
import SaveIcon from '../assets/save.svg';
import ShareIcon from '../assets/share.svg';
import TerminalIcon from '../assets/terminal.svg';
import FolderIcon from '../assets/folder.svg';
import FilledSaveIcon from '../assets/save-filled.svg';
import AcceptedIcon from '../assets/tick.svg';
import TriangleIcon from '../assets/vote.svg';

// import style
import '../styles/FullPost.css';
import { axiosInstance } from "../lib/axios.js";

export default function FullPost({ 
    _id, 
    isComment, 
    isAccepted, 
    timeSincePost, 
    author, 
    authorId,
    postTags, 
    postTitle, 
    voteCount, 
    postContent, 
    codeContent, 
    files,
    fetchFileContent,
    folderContent,
    user,
}){
    const [tagHoverIndex, setTagHoverIndex] = useState(null);
    const [saveButtonActive, setSaveButtonActive] = useState(user && user.savedPosts ? user.savedPosts.includes(_id) : false);
    const [isCodeExpanded, setIsCodeExpanded] = useState(false);
    const [isFileViewerExpanded, setIsFileViewerExpanded] = useState(false);  

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
        });
    }

    // Copy URL to clipboard
    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Copied link to clipboard!");
    };

    // Save or unsave post
    const toggleSavePost = async () => {
        if (!user) {
            toast.error("You have to log in first!");
            return;
        }
    
        try {
            const action = saveButtonActive ? 'unsave' : 'save';
            
            const response = await axiosInstance.post(`/post/${_id}/${action}`, {
                userId: user._id
            });
    
            if (response.status !== 200) {
                throw new Error('Failed to update saved posts in the backend.');
            }
    
            if (saveButtonActive) {
                user.savedPosts = user.savedPosts.filter((savedPost) => savedPost !== _id);
                toast.success("Post unsaved.");
            } else {
                user.savedPosts.push(_id);
                toast.success("Post saved.");
            }
    
            setSaveButtonActive(!saveButtonActive);
        } catch (error) {
            toast.error("Error updating saved posts.");
            console.error('Error:', error);
        }
    };
    
    
    
    return (
        <>
            <div className={`app-window ${isComment ? "is-comment" : "is-post"}`} id="post-window">
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
                            {/* Share button */}
                            <button className="share-button" onClick={copyUrl}>
                                <span className="share-icon"><img src={ShareIcon} ></img></span>
                                <span className="share-title">share</span>
                            </button>
                            {/* Save button */}
                            <button className={`${saveButtonActive ? "saved" : "save" }-button`}
                                    onClick={toggleSavePost}>
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
                            <a href={`../user/${authorId}`} className="avatar-container">
                                <Avatar id={authorId} name={author} />      
                            </a>
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
                            <Vote voteCount={voteCount} _id={_id}/>
                        </div>
                        {(!isComment && postTags) ? (
                            <div className="tag-container">
                                {postTags.map((tag, index) => {
                                    if (tag) {
                                        return <Tag key={index} tagName={ellipsis(tag, (tagHoverIndex === index ? 8 : 6))}/>
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
                                            <CodeViewer
                                                codeContent={codeContent.data} 
                                                codeLanguage={codeContent.language} 
                                                lineCount={codeContent.lines}
                                            />
                                        </div>
                                    </CSSTransition>
                            </div>
                        ) : ("")}
                        {files ? (
                            <div className="post-files-view-container">
                                <div className="folder-header">
                                    <span className="folder-header-logo">
                                        <img src={FolderIcon}></img>
                                    </span>
                                    <span className="folder-header-text">folder</span>
                                    {isFileViewerExpanded ? (
                                        <button className="folder-toggle folder-hidden"
                                                onClick={() => setIsFileViewerExpanded(false)}
                                        >
                                            <span className="folder-toggle-text">hide files</span>
                                            <span className="folder-toggle-logo">
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
                                        <button className="folder-toggle"
                                            onClick={() => setIsFileViewerExpanded(true)}
                                        >                                         
                                            <span className="folder-toggle-text">show files</span>
                                            <span className="folder-toggle-logo">
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
                                    in={isFileViewerExpanded}
                                    timeout={300}
                                    classNames={"files-view-transition"}
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <div className="post-files-view">
                                        <FileUpload viewMode
                                            existingFilesArr={files} 
                                            viewModeFetchContent={fetchFileContent}
                                        />
                                    </div>
                                </CSSTransition>
                            </div>
                        ) : ("")}
                    </div>

                </div>

            </div>
        </>
    );

}

