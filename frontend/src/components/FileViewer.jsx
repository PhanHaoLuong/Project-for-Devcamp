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

const FileViewer = ({ fileName, fileExtension, fileContent, fileType, imageURL, visible, exit }) => {
    const [isCloseButtonHover, setIsCloseButtonHover] = useState(false);
    const [isLoadingContent, setIsLoadingContent] = useState(true);
    const getFileContentLen = (data) => {
        return data.split('\n').length;
    };

    useEffect(() => {
        if (fileContent) {
            setIsLoadingContent(false);
        } else {
            setIsLoadingContent(true)
        }
    }, [fileContent]);

    return (
        <CSSTransition
            in={visible}
            classNames="image-viewer-transition"
            timeout={350}
            mountOnEnter
            unmountOnExit
        >
            <div className="file-viewer"  onClick={exit}>
                {!isLoadingContent ? (
                    <div className="code-content">
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
                            <div className="file-code-viewer-container">
                                <CodeViewer
                                    codeContent={'\n' + fileContent + '\n'} 
                                    codeLanguage={codeLanguageExtension[fileExtension] || null} 
                                    lineCount={fileContent ? Math.max(getFileContentLen(fileContent), 20) : null}
                                />
                            </div>
                            <div className="code-viewer-bottom-padding"></div>
                        </div>
                    </div>
                ) : (
                    <><p>loading</p></>
                )}
            </div>

        </CSSTransition>
    );
};

export default FileViewer;
