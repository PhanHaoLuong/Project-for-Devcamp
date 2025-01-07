// import modules
import React, { useState, useEffect } from "react";

// import assets
import FolderIcon from '../assets/folder.svg'
import FileIcon from '../assets/file.svg';

// import styles
import '../styles/FileItem.css'

const FileItem = ({ isFolder, fileName, fileType, openFile, userId, uploadDate, fileSize, onMouseEnter, onMouseLeave }) => {
    
    return (
        <div className="file-item-container">
            <button className="file-item" onClick={openFile}>
                <span className="file-item-logo">
                    <img src={isFolder ? FolderIcon : FileIcon}></img>
                </span>
                <span className="file-item-name">{`${fileName}${isFolder? "" : "."+fileType }` || (isFolder ? "folder" : "file")}</span>
            </button>        
        </div>
    )
}

export default FileItem;