// import modules
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import * as codeLanguageExtension from '../utils/codeLanguageExtension.json';

import CodeViewer from './CodeViewer'

// import styles
import "../styles/FileViewer.css";

const FileViewer = ({ fileExtension, fileContent, fileType, imageURL, visible, exit, ref }) => {
    const getFileContentLen = (fileContent) => {
        return fileContent.split('\n').length;
    };

    return (
        <CSSTransition
            in={visible}
            classNames="image-viewer-transition"
            timeout={350}
            mountOnEnter
            unmountOnExit
        >
            <div className="file-viewer">
                {imageURL ? (
                    <div className="image-viewer" onClick={exit}>
                        <img src={imageURL} alt="image preview" />
                        <button className="close-button"></button>
                    </div>
                ) : (<></>)}
                {fileContent ? (
                    <div className="code-content" onClick={exit}>
                        <CodeViewer
                            codeContent={fileContent} 
                            codeLanguage={codeLanguageExtension[fileExtension] || null} 
                            lineCount={Math.max(getFileContentLen(fileContent), 20)}
                        />
                    </div>
                ) : (<></>)}
            </div>

        </CSSTransition>
    );
};

export default FileViewer;
