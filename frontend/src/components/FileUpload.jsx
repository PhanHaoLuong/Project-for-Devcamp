// import modules
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from 'react-transition-group';
import Dropzone, { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import JSZip from 'jszip';

// import components
import FileItem from "./FileItem";
import ImageViewer from "./ImageViewer";

// import assets
import FolderIcon from "../assets/folder.svg";
import AddIcon from "../assets/add.svg";

// import styles
import '../styles/FileUpload.css'


const DisplayUpload = ({
    viewModeFilesArr,
    viewMode,
    setParentFiles
}) => {
    // default value
    const [filesArr, setFilesArr] = useState(viewModeFilesArr || []);
    const [isDropping, setDropping] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [folderUpload, setFolderUpload] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageViewerVisible, openImageViewer] = useState(false);

    const fileInputRef = useRef(null);
    const dropzoneRef = useRef(null);

    const sliderRef = useRef(null);
    const folderOptionRef = useRef(null);
    const fileOptionRef = useRef(null);

    // drop screen component
    const [dropScreenBg, setDropScreenBg] = useState("#192233");


    const dropScreen = !viewMode ? (
        <div className="drop-screen"
            style={isEmpty ? {
                cursor: "pointer",
                backgroundColor: dropScreenBg,
                transition: "all 0.1s"
            } : {}}
        >
            <span className="drop-screen-icon">
                <img src={FolderIcon} />
            </span>
            <span className="drop-screen-text">{`${isEmpty ? "click or" : "" } drop to upload`}</span>
        </div>
    ) : (<></>);


    const {
        acceptedFiles, 
        getRootProps, 
        getInputProps,
        open,
        isDragActive
    } = useDropzone({
        onDrop: () => {
            setDropping(false);
            if (isEmpty) setDropScreenBg("#192233");
        },

        onDragEnter: () => {
            setDropping(true);
            if (isEmpty) setDropScreenBg("");
        },

        onDragLeave: () => {
            setDropping(false);
            if (isEmpty) setDropScreenBg("#192233");
        },
        
        onDropAccepted: (acceptedFiles) => {
            setFilesArr(prevMetadataArr => [
                ...prevMetadataArr, ...acceptedFiles.map(file => {
                    return {
                        id: uuidv4(),
                        name: file.name,
                        size: file.size,
                        path: file.webkitRelativePath,
                        preview: URL.createObjectURL(file)
                    }
                })
            ])

        },
        disabled: viewMode,
        noClick: !isEmpty,
        useFsAccessApi: false
    });

    useEffect(() => {
        // revoke preview urls when unmount
        return () => {
            filesArr.forEach(file => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [])


    useEffect(() => {
        if (!filesArr.length) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
        
    }, [filesArr]);

    /* useEffect(() => {
        if (sliderRef.current && folderOptionRef.current && fileOptionRef.current) {
            sliderRef.current.style.width = folderOptionRef.current.off;
        }
    }, [folderUpload]) */

    const createZipFromFolder = async (files) => {

    };


    const handleRemove = (id) => {
        setFilesArr(prevMetadataArr => {
            const fileToRemove = prevMetadataArr.find(file => file.id === id);
            if (fileToRemove && fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            
            return prevMetadataArr.filter(file => file.id !== id);
        });
    }

    return (
        <>
        <ImageViewer 
            visible={imageViewerVisible}
            exit={() => {
                openImageViewer(false);
                setTimeout(() => setSelectedImage(null), 250);
            }}
            imageURL={selectedImage}
        />
            <div className="file-panel">
                <div className="file-container">
                    {/* <div className="current-path"
                    style={{fontSize: "2rem"}}
                    >
                        &gt; ./app
                    </div> */}
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        webkitdirectory={folderUpload ? "true" : false}
                        {...getInputProps()}
                    /> {/* hidden input */}
                    <div className="upload-select-container">
                        <button className="upload-button"
                            onClick={open}
                        >
                            <span className="logo">
                                <img src={AddIcon} />
                            </span>
                            <span className="upload-text">upload</span>
                        </button>
                        <button className="upload-type-select"
                            onClick={() => setFolderUpload(!folderUpload)}
                        >
                            <div className="slider" ref={sliderRef}
                                style={!folderUpload ? {
                                    left: 0,
                                    transform: "translateX(0)",
                                    transition: "all ease-in-out 0.2s"
                                } : {
                                    transform: "translateX(calc(75px))",
                                    transition: "all ease-in-out 0.2s"
                                }}
                            ></div>
                            <span 
                                className="upload-type-option" 
                                id="file-upload-option"
                                ref={fileOptionRef}
                            >file</span>
                            <span 
                                className="upload-type-option" 
                                id="folder-upload-option"
                                ref={folderOptionRef}
                            >folder</span>
                        </button>
                    </div>
                    <div 
                        className="dropzone-root"
                        ref={dropzoneRef}
                        {...getRootProps()}
                    >

                        <CSSTransition
                            in={isDropping || isEmpty}
                            classNames={"drop-screen-transition"}
                            timeout={450}
                            mountOnEnter
                            unmountOnExit
                        >
                            {dropScreen}
                        </CSSTransition>
                        {filesArr.map((file) => {
                            return (
                                <FileItem key={file.id}
                                    isUploading={true}
                                    fileName={file.name}
                                    fileSize={file.size}
                                    openFile={() => {
                                        setSelectedImage(file.preview)
                                        openImageViewer(true);
                                    }}
                                    viewMode={viewMode}
                                    removeFile={() => {
                                        handleRemove(file.id);
                                    }}
                                />  
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayUpload;