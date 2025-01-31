// import modules
import React, { useState, useEffect, useRef } from "react";
import Dropzone, { useDropzone } from 'react-dropzone';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

// import components
import FileItem from "./FileItem";

// import assets
import FolderIcon from "../assets/folder.svg"

// import styles
import '../styles/FileUpload.css'


const DisplayUpload = ({
    files,
    viewMode,
    setParentFiles
}) => {
    // default value
    const [filesArr, setFilesArr] = useState([]);
    const [isDropping, setDropping] = useState(false);
    const fileInputRef = useRef(null);

    // drop screen component
    const [dropScreenBg, setDropScreenBg] = useState("#192233");

    const dropScreen = (
        <div className="drop-screen"
            style={!filesArr.length ? {
                backgroundColor: dropScreenBg,
                transition: "all 0.1s"
            } : {}}
        >
            <span className="drop-screen-icon">
                <img src={FolderIcon} />
            </span>
            <span className="drop-screen-text">drop to upload</span>
        </div>
    );

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: () => {
            setDropping(false);
            if (!filesArr.length) setDropScreenBg("#192233");
        },

        onDragEnter: () => {
            setDropping(true);
            if (!filesArr.length) setDropScreenBg("");
        },

        onDragLeave: () => {
            setDropping(false);
            if (!filesArr.length) setDropScreenBg("#192233");
        },
        
        onDropAccepted: (acceptedFiles) => {
            setFilesArr(prevMetadataArr => [
                ...prevMetadataArr, ...acceptedFiles.map(file => {
                    return {
                        id: uuidv4(),
                        name: file.name,
                        size: file.size
                    }
                })
            ])
        }
    });

    // sample file and folder data
    useEffect(() => {
        setFilesArr([
            {
                id: uuidv4(),
                name: "image.png",
                size: "123213123213"
            },
            {
                id: uuidv4(),
                name: "document.pdf",
                size: "456789456789"
            },
            {
                id: uuidv4(),
                name: "presentation.pptx",
                size: "789123789123"
            },
            {
                id: uuidv4(),
                name: "spreadsheet.xlsx",
                size: "321654321654"
            }
        ])
    }, [])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newFileMetadata = {
                id: uuidv4(),
                name: file.name,
                size: file.size
            }
            setFilesArr(prevMetadataArr => 
                [...prevMetadataArr, newFileMetadata]
            )
        }
    }

    const handleRemove = (id) => {
        setFilesArr(prevMetadataArr =>
            prevMetadataArr.filter(file => file.id !== id)
        );
    }

    return (
        <div className="file-panel">
            {!viewMode ? (
                <div className="file-upload-button">
                    <button>upload file</button>
                </div>
            ) : ("")}
            <div className="file-container">
                <input 
                    type="file" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    {...getInputProps({onClick: event => event.preventDefault()})}
                /> {/* hidden input */}
                <div className="dropzone-root" {...getRootProps()}>
                    <CSSTransition
                        in={isDropping || !filesArr.length}
                        classNames={"drop-screen-transition"}
                        timeout={450}
                        mountOnEnter
                        unmountOnExit
                    >
                        {dropScreen}
                    </CSSTransition>
                    {filesArr.map((fileMetadata) => {
                        return (
                            <FileItem key={fileMetadata.id}
                                isUploading={true}
                                fileName={fileMetadata.name}
                                fileSize={fileMetadata.size}
                                removeFile={() => handleRemove(fileMetadata.id)}
                            />  
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default DisplayUpload;