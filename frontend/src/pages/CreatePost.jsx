// import modules
import React, { useState, useEffect } from "react";
import { CSSTransition } from 'react-transition-group';

// import assets
import TerminalIcon from "../assets/terminal.svg";
import AddIcon from "../assets/add.svg";
import AcceptedIcon from '../assets/tick.svg';

//import components
import CodeEditor from "./CodeEditor";

import "../styles/CreatePost.css";
import DialogBox from "../components/DialogBox";

function CreatePost() {
  const [titleText, setTitleText] = useState(0);
  const [contentText, setContentText] = useState(0);
  const [isCodeEdit, setCodeEdit] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [codeContent, setCodeContent] = useState("");

  const [confirmRmDialog, setConfirmRmDialog] = useState(false);

  const handleTitleChange = (event) => {
    const text = event.target.value;
    if (text.length <= 100) {
      setTitleText(event.target.value);
    }
  };

  const handleContentChange = (event) => {
    const text = event.target.value;
    if (text.length <= 2048) {
      setContentText(event.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: titleText,
          content: contentText,
          codeData: {
            language: codeLanguage,
            data: codeContent,
          },
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (contentText.length > 2048) {
      setContentText(contentText.substring(0, 2048));
    }
  }, [contentText]);

  return (
    <>
        <DialogBox 
          visible={confirmRmDialog}
          mode="confirm"
          message="are you sure you want to delete your code?"
          onConfirm={() => {
              setCodeContent("");
              setCodeLanguage("");
              setConfirmRmDialog(false);
            }
          }
          onClose={() => {
              setConfirmRmDialog(false);
            }
          }
        />

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
                <input
                  type="text"
                  onChange={handleTitleChange}
                  value={titleText || ""}
                ></input>
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
                  <textarea
                    className="content-textarea"
                    onChange={handleContentChange}
                    value={contentText || ""}
                  ></textarea>
                  <div
                    className="char-limit"
                    style={
                      contentText.length >= 2048 ? {color: "#e03f42",} : {}
                    }
                  >
                    {contentText.length || 0}/2048
                  </div>
                </div>
              </div>
              {codeContent ? (
                <div className="code-lang-view-container">
                  <div className="code-title">code</div>
                  <div className="code-lang-view">
                    <span className="code-lang">{codeLanguage || "no language detected"}
                      <div className="code-view"
                          onClick={() => setCodeEdit(true)}>view code
                      </div>
                    </span>
                  </div>
                </div>
              ) : ("")}
              <div className="buttons-container">
                {!codeContent ? (
                  <button
                    className="add-code-button"
                    onClick={() => setCodeEdit(true)}
                  >
                    <span className="add-code-button-logo">
                      <img src={AddIcon}></img>
                    </span>
                    <span className="add-code-button-title">add code</span>
                  </button>
                ) : (
                  <button
                    className="remove-code-button"
                    onClick={() => {
                      setConfirmRmDialog(true);
                    }}
                  >
                    remove code
                  </button>
                )}
                <button className="submit-button">
                  <span className="submit-button-title" onClick={handleSubmit}>
                    submit
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="code-editor-page">
          <button
            className="return-button"
            onClick={() => {
              setCodeEdit(false);
            }}
          >
            &lt; return to post page
          </button>

          <CodeEditor
            setCodeContent={setCodeContent}
            codeContent={codeContent}
            setCodeEdit={setCodeEdit}
            setCodeLanguage={setCodeLanguage}
          />
        </div>
      )}
    </>
  );
}

export default CreatePost;
