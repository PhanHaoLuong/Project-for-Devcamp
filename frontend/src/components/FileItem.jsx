// import modules
import React, { useState, useEffect } from "react";
import displayFileSize from "../utils/displayFileSize";

// import assets
import FolderIcon from '../assets/folder.svg'
import FileIcon from '../assets/file.svg';

// import styles
import '../styles/FileItem.css'

const FileItem = ({ 
    isFolder=false, 
    viewMode,
    loadMessage,
    fileName, 
    openFile, 
    fileSize,
    removeFile, 
}) => {
    
    return (
        <div className="file-item-container">
            <button className="file-item" onClick={openFile}>
                <div className="file-name-container">
                    <span className="file-logo">
                        <img src={isFolder ? FolderIcon : FileIcon}></img>
                    </span>
                    <div className="file-name">{fileName || (isFolder ? "folder" : "file")}</div>
                </div>
                <div className="size-remove-file-container">
                    <div className="file-size">
                        {!isFolder ? (displayFileSize(fileSize || "")) : ("")}
                    </div>
                    {!viewMode ? (
                        <div className="remove-file" onClick={removeFile}>
                            remove file
                        </div>
                    ) : ("")}
                </div>
            </button>        
        </div>
    )
}

export default FileItem;