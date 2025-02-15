// import modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import * as configs from '../configs.json';

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
            const files_upload = await fetch("http://localhost:3000/file", {
                method: "POST",
                credentials: "include",
                contentType: "multipart/form-data",
                body: formData
            })
            const files_metadata = await files_upload.json(); //Getting the metadata + _id of the files uploaded


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
                    files_metadata: files_metadata
                })
            });
            const data = await response.json();
            if (response.status === 201) {
                setSubmitLoading(false);
                navigate(`/post/${data.redirect}`);
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

    useEffect(() => {
        if (isTitleEmptyErr && titleText) {
            setIsTitleEmptyErr(false);
        }
    }, [titleText])


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
                                            contentText.length >= 2048 ? { color: "#e03f42" } : {}
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
                                        <span className="code-lang">
                                            {codeLanguage || "no language detected"}
                                            <div
                                                className="code-view"
                                                onClick={() => setCodeEdit(true)}
                                            >
                                                view code
                                            </div>
                                        </span>
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
                                            setConfirmRmCodeDialog(true);
                                        }}
                                    >
                                        remove code
                                    </button>
                                )}
                                <button className="submit-button"
                                    onClick={() => {
                                        if (titleText || titleText === 0) {
                                            setSubmitLoading(true);
                                            handleSubmit();
                                        } else {
                                            setIsTitleEmptyErr(true);
                                        }
                                    }}
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