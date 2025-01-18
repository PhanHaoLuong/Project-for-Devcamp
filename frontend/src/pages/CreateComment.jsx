// import modules
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import displayTime from "../utils/displayTime";

// import assets
import TerminalIcon from "../assets/terminal.svg";
import AddIcon from "../assets/add.svg";
import AcceptedIcon from '../assets/tick.svg';
import LoadingIcon from "../assets/loading-circle.gif"

//import components
import CodeEditor from "./CodeEditor";
import DialogBox from "../components/DialogBox";
import MiniPost from "../components/MiniPost";

// import styles
import "../styles/CreateComment.css";

function CreateComment() {
    const [parentPost, setParentPost] = useState(null);

    const [contentText, setContentText] = useState(0);
    const [codeLanguage, setCodeLanguage] = useState("");
    const [codeContent, setCodeContent] = useState("");
    const [lineCount, setLineCount] = useState(0);
    
    const [isCodeEdit, setCodeEdit] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [confirmRmDialog, setConfirmRmDialog] = useState(false);
    
    const navigate = useNavigate();
    const { postId } = useParams();
    const { state } = useLocation();

    const handleContentChange = (event) => {
        const text = event.target.value;
        if (text.length <= 2048) {
            setContentText(event.target.value);
        }
    };

    const getPostData = async () => {
        const { postData } = state;
        setParentPost(postData);
    }

    useEffect(() => {
        getPostData();
    }, []);

    const handleSubmit = async () => { 
        try {
            const response = await fetch(`http://localhost:3000/post/${postId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
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
            } else {
                setSubmitLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (contentText.length > 2048) {
            setContentText(contentText.substring(0, 2048));
        }
    }, [contentText]);

    const getTimeSincePost = (createdAt) => {
        const now = new Date();
        const creationTime = new Date(createdAt);
        return (now.getTime() - creationTime.getTime()) / 1000;
    };

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
                <div className="create-comment-container">
                    <div className="app-window" id="create-comment-window">
                        <div className="create-comment-header">
                            <span className="header-icon">
                                <img src={TerminalIcon} alt="T"></img>
                            </span>
                            <span className="header-title">create comment</span>
                        </div>
                        <div className="create-comment-body">
                            <div className="commenting-on">
                                <div className="header">
                                    commenting on
                                </div>
                                {parentPost ? (
                                    <MiniPost
                                        postId={parentPost._id}
                                        author={parentPost.author.name}
                                        postTitle={parentPost.title}
                                        timeSincePost={displayTime(
                                            getTimeSincePost(parentPost.createdAt)
                                        )}
                                        postTags={null}
                                        postContent={parentPost.content}
                                        topLevelFolder={null}
                                        expandData={
                                            {
                                                code: parentPost.code
                                            }
                                        }
                                        expandMode
                                    />
                                ) : ("")}
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
                                            comment
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
                        &lt; return to comment page
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

export default CreateComment;
