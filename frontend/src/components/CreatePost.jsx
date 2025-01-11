import React, { useState, useEffect } from "react";

import TerminalIcon from '../assets/terminal.svg';

import "../styles/CreatePost.css";
import "../assets/post.png";



function CreatePost() {
  const [contentText, setContentText] = useState(0);

  const handleContentChange = (event) => {
    setContentText(event.target.value)
  }

  useEffect(() => {
    if (contentText.length > 2048) {
      setContentText(contentText.substring(0, 2048))
    }
  }, [contentText])

  return (
    <>
      <div className="create-post-container">
        <div className="app-window" id="create-post-window">
          <div className="create-post-header">
            <span className="header-icon">
              <img src={TerminalIcon} alt="T"></img>
            </span>
            <span className="header-title">create post</span>
          </div>
          <div className="create-post-body">
            <div className="create-title-container">
              <div className="title-create-text">title</div>
              <input type="text"></input>
            </div>
            <div className="create-content-container">
              <div className="content-create-text">content</div>
              <div className="content-area-container">
                <textarea className="content-textarea"
                  onChange={handleContentChange}
                  value={contentText}
                >
                </textarea>
                <div className="char-limit"
                  style={contentText.length >= 2048 ? {
                    "color": "#e03f42",
                  } : {}}
                >
                  {contentText.length || 0}/2048
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;