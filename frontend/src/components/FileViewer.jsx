// import modules
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import * as codeLanguageExtension from '../utils/codeLanguageExtension.json';

// import components
import CodeViewer from './CodeViewer'

// import assets
import CloseIcon from '../assets/close-icon.svg';
import CloseIconActive from '../assets/close-icon-active.svg'

// import styles
import "../styles/FileViewer.css";

const FileViewer = ({ fileName, fileExtension, fileContent, fileType, imageURL, visible, exit, ref }) => {
    const [isCloseButtonHover, setIsCloseButtonHover] = useState(false);
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
                        <img src={imageURL} alt="image preview"
                            onClick={e => e.stopPropagation()}
                            draggable="false"
                        />
                    </div>
                ) : (<></>)}
                {fileContent ? (
                    <div className="code-content" onClick={exit}>
                        <div className="code-viewer-container" >
                            <div className="code-viewer-header"
                                onClick={e => e.stopPropagation()}
                            >
                                <p className="file-name">{fileName}</p>
                                <button className={`close-button ${isCloseButtonHover ? "hover" : ""}`}
                                    onClick={exit}
                                >
                                    <img src={isCloseButtonHover ? CloseIconActive : CloseIcon}
                                        onMouseEnter={() => setIsCloseButtonHover(true)}
                                        onMouseLeave={() => setIsCloseButtonHover(false)}
                                    />
                                </button>
                            </div>
                            <CodeViewer
                                codeContent={'\n' + fileContent + '\n'} 
                                codeLanguage={codeLanguageExtension[fileExtension] || null} 
                                lineCount={Math.max(getFileContentLen(fileContent), 20)}
                            />
                            <div className="code-viewer-bottom-padding"></div>
                        </div>
                    </div>
                ) : (<></>)}
            </div>

        </CSSTransition>
    );
};

export default FileViewer;
