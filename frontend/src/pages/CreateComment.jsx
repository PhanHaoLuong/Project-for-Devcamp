// import modules
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import displayTime from "../utils/displayTime";

// import assets
import TerminalIcon from "../assets/terminal.svg";
import AddIcon from "../assets/add.svg";
import LoadingIcon from "../assets/loading-circle.gif"

//import components
import CodeEditor from "./CodeEditor";
import DialogBox from "../components/DialogBox";
import MiniPost from "../components/MiniPost";
import LanguageSelector from "../components/LanguageSelector";
import { useCodeEditorStore } from "../store/useCodeEditorStore";


// import styles
import "../styles/CreateComment.css";
import { axiosInstance } from "../lib/axios";

function CreateComment() {
    const [parentPost, setParentPost] = useState(null);

    const [contentText, setContentText] = useState("");
    const [isContentEmptyErr, setIsContentEmptyErr] = useState(false);

    const [codeLanguage, setCodeLanguage] = useState("");
    const [codeContent, setCodeContent] = useState("");
    
    const [lineCount, setLineCount] = useState(0);
    
    const [isCodeEdit, setCodeEdit] = useState(false);
    const [IsSubmitLoading, setSubmitLoading] = useState(false);
    const [confirmRmDialog, setConfirmRmDialog] = useState(false);
    
    const [isNarrowScreen, setIsNarrowScreen] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            setIsNarrowScreen(window.innerWidth < 600);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            const response = await axiosInstance.post(`/post/${postId}/comment`, {
                    content: contentText,
                    codeData: {
                        language: codeLanguage,
                        data: codeContent,
                        lines: lineCount,
                    },
                }); 
            const data = await response.data;
            if (response.status === 201) {
                navigate(`/post/${data.redirect}`);
            } else {
                setTimeout(() => setSubmitLoading(false), 2000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const { getCode, editor } = useCodeEditorStore();
    const handleCodeSubmit = async (e) => { 
        e.preventDefault();

        try {
            const code = getCode();
            setLineCount(editor.getModel().getLineCount());
            setCodeContent(code);
            setCodeEdit(false);
        } catch (error) {
            console.error('Error : ', error);
        }
    };

    useEffect(() => {
        if (contentText.length > 2048) {
            setContentText(contentText.substring(0, 2048));
        }
    }, [contentText]);


    useEffect(() => {
        if (contentText && isContentEmptyErr) {
            setIsContentEmptyErr(false);
        }
    }, [contentText])


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
                                        style={isContentEmptyErr ? {
                                            outline: "none",
                                            border: "#e03f42 solid 1px",
                                            transition: "all 0.2s"
                                        } : {
                                            outline: "none",
                                            transition: "all 0.2s"
                                        }}
                                    />
                                    <div 
                                        style={{
                                            display: "flex",
                                            
                                        }}
                                    
                                    >
                                        {isContentEmptyErr ? <div className="error-message">content is required</div> : ""}
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
                            </div>
                            {codeContent ? (
                                <div className="uploaded-code-view-container">
                                    <div className="code-title">code</div>
                                    <div className="uploaded-code-view">
                                        <div className="code-lang">
                                            <p>{codeLanguage}</p>
                                        </div>
                                        <button className="view-code-button"
                                            onClick={() => {
                                                setCodeEdit(true);
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth"
                                                });
                                            }}
                                        >
                                            {"view code"}
                                        </button>
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
                                <button className="submit-button"
                                    onClick={() => {
                                        if (contentText) {
                                            setSubmitLoading(true);
                                            handleSubmit();
                                        } else {
                                            if (!contentText) setIsContentEmptyErr(true);
                                        }
                                    }}
                                    disabled={IsSubmitLoading}
                                >
                                    {IsSubmitLoading ? <img src={LoadingIcon} 
                                        style={{height: "16px"}}
                                    /> : ""}
                                    <span className="submit-button-title">
                                        {IsSubmitLoading ? "posting..." : "post"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="code-editor-page">
                    <div className="top-buttons-container"
                        style={!isNarrowScreen ? {
                            width: "60%"
                        } : {
                            width: "100%"
                        }}
                    >
                        <div className="top-left-code-buttons">
                            <button
                                className="return-button"
                                onClick={() => {
                                    setCodeEdit(false);
                                }}
                            >
                                return to post
                            </button>
                            <button className="submit-code-button" 
                                onClick={handleCodeSubmit}
                            >
                                submit code
                            </button>
                        </div>
                        <LanguageSelector setCodeLanguage={setCodeLanguage}/>
                    </div>

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
