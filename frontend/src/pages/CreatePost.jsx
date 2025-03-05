// import modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import * as configs from '../configs.json';
import { axiosInstance } from "../lib/axios.js";
import EditorPanel from "../components/EditorPanel"
import LanguageSelector from "../components/LanguageSelector";
import { useCodeEditorStore } from "../store/useCodeEditorStore";

// import assets
import TerminalIcon from "../assets/terminal.svg";
import AddIcon from "../assets/add.svg";
import FolderIcon from "../assets/folder.svg";
import AcceptedIcon from '../assets/tick.svg';
import LoadingIcon from "../assets/loading-circle.gif"

//import components
import CodeEditor from "./CodeEditor";
import FileUpload from "../components/FileUpload";

import TagSelector from "../components/TagSelector";
import DialogBox from "../components/DialogBox";
import Tag from "../components/Tag";

// import styles
import "../styles/CreatePost.css";

function CreatePost() {
    // loading state
    const [IsSubmitLoading, setSubmitLoading] = useState(false);

    // tag selection state
    const [selectTagMode, toggleSelectTag] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);

    // post content state
    const [titleText, setTitleText] = useState("");
    const [contentText, setContentText] = useState("");

    // empty required content state
    const [isTitleEmptyErr, setIsTitleEmptyErr] = useState(false);
    const [isContentEmptyErr, setIsContentEmptyErr] = useState(false);

    // code editor state
    const [isCodeEdit, setCodeEdit] = useState(false);
    const [codeLanguage, setCodeLanguage] = useState("");
    const [codeContent, setCodeContent] = useState("");
    const [lineCount, setLineCount] = useState(0);

    // file upload state
    const [isFileEdit, setFileEdit] = useState(false);
    const [filesContent, setFilesContent] = useState([]);

    // confirm state
    const [confirmRmCodeDialog, setConfirmRmCodeDialog] = useState(false);
    const [confirmRmFileDialog, setConfirmRmFileDialog] = useState(false);
    
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
            //Create a formData object to send the files to the server
            const formData = new FormData();
            filesContent.forEach((file) => {
                formData.append("files", file.fileObj, file.fileObj.name);
                formData.append("metadata[]", JSON.stringify({
                    name: file.name,
                    size: file.size,
                    path: file.path,
                    type: file.type,
                    uploadedAt: file.uploadedAt
                }))
            })

            //Send a request containing the files to the server
            const files_upload = await axiosInstance.post("/file", {
                formData
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            const files_metadata = await files_upload.data; //Getting the metadata + _id of the files uploaded


            const response = await axiosInstance.post("/post/create", {
                    title: titleText,
                    content: contentText,
                    codeData: {
                        language: codeLanguage,
                        data: codeContent,
                        lines: lineCount,
                    },
                    files_metadata: files_metadata
                });
            const { redirect } = await response.data;
            if (response.status === 201) {
                setSubmitLoading(false);
                navigate(`/post/${redirect}`);
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
        if (isTitleEmptyErr && titleText) {
            setIsTitleEmptyErr(false);
        }
    }, [titleText])

    useEffect(() => {
        if (isContentEmptyErr && contentText) {
            setIsContentEmptyErr(false);
        }
    }, [contentText])

    return (
        <>
            <DialogBox
                visible={confirmRmCodeDialog}
                mode="confirm"
                message="are you sure you want to delete your code?"
                onConfirm={() => {
                    setCodeContent("");
                    setCodeLanguage("");
                    setConfirmRmCodeDialog(false);
                }}
                onClose={() => {
                    setConfirmRmCodeDialog(false);
                }}
            />
            <DialogBox
                visible={confirmRmFileDialog}
                mode="confirm"
                message="are you sure you want to delete your files?"
                onConfirm={() => {
                    setFilesContent([]);
                    setConfirmRmFileDialog(false);
                }}
                onClose={() => {
                    setConfirmRmFileDialog(false);
                }}
            />

            {!(isCodeEdit || isFileEdit) ? (
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
                                    style={isTitleEmptyErr ? {
                                        outline: "none",
                                        border: "#e03f42 solid 1px",
                                        transition: "all 0.2s"
                                    } : {
                                        outline: "none",
                                        transition: "all 0.2s"
                                    }}
                                />
                                {isTitleEmptyErr && !titleText ? 
                                    <div className="error-message">title is required</div> : ""}
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
                                        style={isContentEmptyErr ? {
                                            outline: "none",
                                            border: "#e03f42 solid 1px",
                                            transition: "all 0.2s"
                                        } : {
                                            outline: "none",
                                            transition: "all 0.2s"
                                        }}
                                    />
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}>
                                        {isContentEmptyErr && !contentText ? 
                                            <div className="error-message">content is required</div> : ""}
                                        <div
                                            className="char-limit"
                                            style={
                                                contentText.length >= 2048 ? { color: "#e03f42" } : {}
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
                                            onClick={() => setCodeEdit(true)}
                                        >
                                            {"view code"}
                                        </button>
                                    </div>
                                </div>
                                
                            ) : ("")}
                            {filesContent.length ? (
                                <div className="uploaded-file-view-container">
                                    <div className="file-title">files</div>
                                    <div className="uploaded-file-view">
                                        <div className="files-count">
                                            <p>{filesContent.length || 0} {filesContent.length === 1 ? "file" : "files"} uploaded</p>
                                        </div>
                                        <button className="view-file-button"
                                            onClick={() => setFileEdit(true)}
                                        >
                                            view files
                                        </button>
                                    </div>
                                </div>
                            ) : ("")}
                            <div className="buttons-container">
                                {!filesContent.length ? (
                                    <button className="add-file-button"
                                        onClick={() => setFileEdit(true)}
                                    >
                                        <img src={FolderIcon} />
                                        <p>upload file</p>
                                    </button>
                                ) : (
                                    <button
                                        className="remove-code-button"
                                        onClick={() => {
                                            setConfirmRmFileDialog(true);
                                        }}
                                    >
                                        remove all files
                                    </button>
                                )}
                                {!codeContent ? (
                                    <button
                                        className="add-code-button"
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth"
                                            });
                                            setCodeEdit(true)
                                        }}
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
                                            setConfirmRmCodeDialog(true);
                                        }}
                                    >
                                        remove code
                                    </button>
                                )}
                                <button className="submit-button"
                                    onClick={() => {
                                        if (titleText && contentText) {
                                            setSubmitLoading(true);
                                            handleSubmit();
                                        } else {
                                            if (!titleText) setIsTitleEmptyErr(true);
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
            ) : (isCodeEdit ? (
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
                ) : (
                    <div className="file-upload-to-post">
                        <FileUpload
                            existingFilesArr={filesContent}
                            setParentFiles={setFilesContent}
                            exit={() => setFileEdit(false)}
                        />
                    </div>
                )
            )}
        </>
    );
}

export default CreatePost;