// import modules
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import CodeViewer from './CodeViewer'

// import styles
import "../styles/FileViewer.css";

const FileViewer = ({ fileContent, fileType, imageURL, visible, exit, ref }) => {
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
                            codeLanguage={null} 
                            lineCount={fileContent.split('\n').length}
                        />
                    </div>
                ) : (<></>)}
            </div>

        </CSSTransition>
    );
};

export default FileViewer;
