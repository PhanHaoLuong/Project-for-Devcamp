// import modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import * as configs from '../configs.json';

// import assets
import TerminalIcon from "../assets/terminal.svg";
import AddIcon from "../assets/add.svg";
import AcceptedIcon from '../assets/tick.svg';
import LoadingIcon from "../assets/loading-circle.gif"

//import components
import CodeEditor from "./CodeEditor";
import TagSelector from "../components/TagSelector";
import DialogBox from "../components/DialogBox";
import Tag from "../components/Tag";

// import styles
import "../styles/CreatePost.css";

function CreatePost() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectTagMode, toggleSelectTag] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [titleText, setTitleText] = useState(0);
  const [contentText, setContentText] = useState(0);
  const [isCodeEdit, setCodeEdit] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [lineCount, setLineCount] = useState(0);

  const navigate = useNavigate();

  const [confirmRmDialog, setConfirmRmDialog] = useState(false);

  const handleTitleChange = (event) => {
    const text = event.target.value;
    if (text.length <= 100) {
      setTitleText(event.target.value);
    }
  };

  const handleContentChange = (event) => {
    const text = event.target.value;
    if (text.length <= configs.postContentCharLimit) {
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
            lines: lineCount,
          },
        }), 
      });
      const data = await response.json();
      if (response.status === 201) {
        navigate(`/post/${data.redirect}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (contentText.length > configs.postContentCharLimit) {
      setContentText(contentText.substring(0, configs.postContentCharLimit));
    }
  }, [contentText]);

  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags])

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
          }}
          onClose={() => {
            setConfirmRmDialog(false);
          }}
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
                {!(selectedTags.length) ? (
                  <button className="add-tag"
                    onClick={(() => toggleSelectTag(!selectTagMode))}
                  >
                    <span className="add-tag-logo">
                      <img src={AddIcon}></img>
                    </span>
                    <span className="add-tag-title">add tag</span>
                  </button>
                ) : (
                  <>
                    <button className="change-tag"
                      onClick={(() => toggleSelectTag(!selectTagMode))}
                    >
                      <span className="change-tag-logo">
                        <img src={AddIcon}></img>
                      </span>
                      <span className="change-tag-title">change tag</span>
                    </button>
                    <div className="selected-tags">
                      {selectedTags.map(tag => 
                        <Tag 
                          tagName={tag.tagName}
                        />
                      )}
                    </div>
                  </>
                )}
                  <CSSTransition
                    in={selectTagMode}
                    classNames="selector-transition"
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                  >
                    <TagSelector 
                      onConfirm={() => toggleSelectTag(false)}
                      getSelectedTags={data => setSelectedTags(data)}
                      getTagOptions={data => setTagOptions(data)}
                      setVisible={() => toggleSelectTag()}
                      currSelectedTags={selectedTags}
                      currTagOptions={tagOptions}
                    />
                  </CSSTransition>
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
                      contentText.length >= configs.postContentCharLimit ? {color: "#e03f42"} : {}
                    }
                  >
                    {contentText.length || 0}/{configs.postContentCharLimit}
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
                {submitLoading ? (
                  <button className={`submit-button loading`}
                    disabled
                  >
                    <span className="submit-button-logo">
                      <img src={LoadingIcon}></img>
                    </span>
                    <span className="submit-button-title">
                      posting...
                    </span>
                  </button>
                ) : (
                  <button className={`submit-button`}
                    onClick={() => {
                      setSubmitLoading(true);
                      handleSubmit();
                    }}
                  >
                    <span className="submit-button-title">
                      post
                    </span>
                  </button>
                )}
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
            setLineCount={setLineCount}
          />
        </div>
      )}
    </>
  );
}

export default CreatePost;
