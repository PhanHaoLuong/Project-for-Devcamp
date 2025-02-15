// import modules
import React, { useState, useEffect, useRef } from "react";
import displayFileSize from "../utils/displayFileSize.js";

// import components
import DialogBox from "./DialogBox.jsx"

// import assets
import FolderIcon from '../assets/folder.svg'
import FileIcon from '../assets/file.svg';

// import styles
import '../styles/FileItem.css'

const FileItem = ({ 
    isFolder=false, 
    viewMode,
    fileName, 
    openFile, 
    fileSize,
    removeFile, 
}) => {
    
    const [confirmRemove, setConfirmRemove] = useState(false);
    const fileItemRef = useRef(null);

    const setFocus = (ref) => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    return (
        <>
            <DialogBox 
                mode="confirm"
                message={`are you sure you want to remove ${fileName}`}
                visible={confirmRemove}
                onConfirm={() => {
                    setConfirmRemove(false);
                    setTimeout(() => removeFile(), 120);
                }}
                onClose={() => setConfirmRemove(false)}
            />
            <div className="file-item-container">
                <button className="file-item" 
                    onDoubleClick={openFile}
                    onClick={() => setFocus(fileItemRef)}
                    ref={fileItemRef}
                >
                    <div className="file-name-container">
                        <span className="file-logo">
                            <img src={isFolder ? FolderIcon : FileIcon}></img>
                        </span>
                        <div className="file-name">{fileName || (isFolder ? "folder" : "file")}</div>
                    </div>
                    <div className="size-remove-file-container">
                        <div className="file-size">
                            {!isFolder ? (displayFileSize(fileSize || 0)) : ("")}
                        </div>
                        {!viewMode ? (
                            <button className="remove-file" 
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setConfirmRemove(true);
                                }}
                            >
                                remove file
                            </button>
                        ) : ("")}
                    </div>
                </button>        
            </div>
        </>
    )
}

export default FileItem;