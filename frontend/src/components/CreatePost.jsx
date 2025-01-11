// import modules
import React, { useState, useEffect } from "react";

// import assets
import TerminalIcon from '../assets/terminal.svg';
import AddIcon from "../assets/add.svg";

//import components
import CodeEditor from "../pages/CodeEditor";

import "../styles/CreatePost.css";




function CreatePost() {
  const [titleText, setTitleText] = useState(0);
  const [contentText, setContentText] = useState(0);
  const [isCodeEdit, setCodeEdit] = useState(false);
  const [codeContent, setCodeContent] = useState("");

  const handleTitleChange = (event) => {
    const text = event.target.value;
    if (text.length <= 100) {
      setTitleText(event.target.value)
    }
  }

  const handleContentChange = (event) => {
    const text = event.target.value;
    if (text.length <= 2048) {
      setContentText(event.target.value)
    }
  }

  const handleSubmit = async () => {
  }

  useEffect(() => {
    if (contentText.length > 2048) {
      setContentText(contentText.substring(0, 2048))
    }
  }, [contentText])

  return (
    <>
      {!isCodeEdit ? (
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
                <input type="text" onChange={handleTitleChange} value={titleText || ""}></input>
              </div>
                <div className="add-tag-container">
                <div className="add-tag-text">tags</div>
                  <button className="add-tag">
                    <span className="add-tag-logo">
                      <img src={AddIcon}></img>
                    </span>
                    <span className="add-tag-title">add tag</span>
                  </button>
                </div>
              <div className="create-content-container">
                <div className="content-create-text">content</div>
                <div className="content-area-container">
                  <textarea className="content-textarea"
                    onChange={handleContentChange}
                    value={contentText || ""}
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
              <div className="buttons-container">
                <button className="add-code-button"
                  onClick={() => setCodeEdit(true)}
                >
                  <span className="add-code-button-logo">
                    <img src={AddIcon}></img>
                  </span>
                  <span className="add-code-button-title">add code</span>
                </button>
                <button className="submit-button">
                  <span className="submit-button-title" onClick={handleSubmit}>submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="code-editor-page">
          <button className="return-button" 
            onClick={()=>{setCodeEdit(false)}}
          >
            &lt; return to post page
          </button>

          <CodeEditor setCodeContent={setCodeContent} codeContent={codeContent} setCodeEdit={setCodeEdit}/>
        </div>
      )}
    </>
  );
}

export default CreatePost;