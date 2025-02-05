// import modules
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Dropzone, { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

// import components
import FileItem from "./FileItem";
import FileViewer from "./FileViewer";
import DialogBox from "./DialogBox";

// import assets
import FolderIcon from "../assets/folder.svg";
import AddIcon from "../assets/add.svg";
import ArrowIcon from "../assets/arrow-icon.svg"

// import styles
import "../styles/FileUpload.css";

const FileUpload = ({ viewModeFilesArr, viewMode, setParentFiles }) => {
    // file and folder management
    const [filesArr, setFilesArr] = useState(viewMode && viewModeFilesArr || []);
    const [foldersToDisplay, setFoldersToDisplay] = useState([]);
    const [filesToDisplay, setFilesToDisplay] = useState([]);
    const [foldersArr, setFoldersArr] = useState([])
    const [currDir, setCurrDir] = useState('');
    const [prevForwardDir, setPrevForwardDir] = useState(null);

    // upload states
    const [isDropping, setDropping] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [folderUpload, setFolderUpload] = useState(false);

    // dialog box states
    const [clearConfirmVisible, setClearConfirmVisible] = useState(false);
    const [renameConfirmVisible, setRenameConfirmVisible] = useState(false);
    const [currRenamedFile, setCurrRenamedFile] = useState(null);

    // preview files states
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileViewerVisible, setFileViewerVisible] = useState(false);

    const fileInputRef = useRef(null);
    const dropzoneRef = useRef(null);

    const sliderRef = useRef(null);
    const folderOptionRef = useRef(null);
    const fileOptionRef = useRef(null);


    // drop screen component
    const [dropScreenBg, setDropScreenBg] = useState("#192233");


    const dropScreen = !viewMode ? (
        <div
            className="drop-screen"
            style={
                isEmpty
                    ? {
                          cursor: "pointer",
                          backgroundColor: dropScreenBg,
                          transition: "all 0.1s",
                      }
                    : {}
            }
        >
            <span className="drop-screen-icon">
                <img src={FolderIcon} />
            </span>
            <span className="drop-screen-text">{`${
                isEmpty ? "click or" : ""
            } drop to upload`}</span>
        </div>
    ) : (
        <></>
    );


    const readFileContents = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    };


    const handleDuplicateFiles = (currFiles, newFiles) => {
        return newFiles.map(newFile => {
            let modifiedFile = {...newFile};

            let duplicate = currFiles.some(currFile => (
                    currFile.name === modifiedFile.name
                ) && (
                    currFile.path === modifiedFile.path
                )) ||
                newFiles.filter(anotherNewFile => (
                    anotherNewFile.name === modifiedFile.name
                ) && (
                    anotherNewFile.path === modifiedFile.path
                )).length > 1;

            let iterationCount = 0;

            if (duplicate) {
                setRenameConfirmVisible(true);
                setCurrRenamedFile(modifiedFile.name);
            }

            while (duplicate && iterationCount < 1000) {
                const numberedMatch = modifiedFile.name.match(/\((\d+)\)(?=\s*\..+)/);

                if (numberedMatch) {
                    let currIndex = eval(numberedMatch[1]);
                    modifiedFile.name = modifiedFile.name.replace(/(\(\d+\))(?=\s*\..+)/, `(${currIndex + 1})`);
                } else {
                    modifiedFile.name = modifiedFile.name.replace(/(?=\..+)/, ` (1)`); // Handle the initial duplicate
                }

                duplicate = currFiles.some(currFile => (
                    currFile.name === modifiedFile.name
                ) && (
                    currFile.path === modifiedFile.path
                )) ||
                newFiles.filter(anotherNewFile => (
                    anotherNewFile.name === modifiedFile.name
                ) && (
                    anotherNewFile.path === modifiedFile.path
                )).length > 1;

                iterationCount++;
            }
            
            return modifiedFile;
        })
    };


    const handleFolderCreation = (newFiles) => {
        const createdFolders = {}; 
        const folderArray = []; 
    
        newFiles.forEach(newFile => {
            const pathParts = newFile.path.split('/').slice(0, -1);
    
            let currPath = ""; 
    
            pathParts.forEach(folder => {
                currPath += (currPath ? "/" : "") + folder 
                if (!createdFolders[currPath]) {
                    const folderObject = {
                        id: uuidv4(),
                        name: folder,
                        isFolder: true,
                        path: currPath,
                    };
                    createdFolders[currPath] = folderObject;
                    folderArray.push(folderObject);   
                }
            });
        });
    
        return folderArray;
    };


    const { acceptedFiles, getRootProps, getInputProps, open, isDragActive } =
        useDropzone({
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

            onDropAccepted: async (acceptedFiles) => {
                let filesWithContent = await Promise.all(
                    acceptedFiles.map(async (file) => {
                        let content = null; 
                
                        if (file.type.startsWith('text/')) {
                            try {
                                content = await readFileContents(file);
                            } catch (err) {
                                console.error('Error reading file:', err);
                            }
                        }
            
                        return {
                            id: uuidv4(),
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            path: file.webkitRelativePath,
                            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                            content: content,
                            uploadedAt: new Date().toISOString(),
                        };
                    })
                );
                
                filesWithContent = handleDuplicateFiles(filesArr, filesWithContent);
                setFoldersArr(prevFoldersArr => [...prevFoldersArr, ...handleFolderCreation(filesWithContent)])
                setFilesArr(prevFilesArr => [...prevFilesArr, ...filesWithContent]);
            },
            disabled: viewMode,
            noClick: !isEmpty,
            useFsAccessApi: false,
        });


    useEffect(() => {
        // create folders for viewmode files if in viewmode
        if (viewModeFilesArr) {
            setFoldersArr(handleFolderCreation(viewModeFilesArr));
        }

        // cleanup, revoke preview urls when unmount
        return () => {
            filesArr.forEach((file) => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, []);


    useEffect(() => {
        if (!filesArr.length) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
        console.log(currDir.split('/').slice(0, -1).join('/'))
    }, [filesArr]);


    useEffect(() => {
        if (currDir === "") {
            setFilesToDisplay(filesArr.filter(f => f.path.split('/').length === 1)); 
            setFoldersToDisplay(foldersArr.filter(f => f.path.split('/').length === 1)); 
        } else {
            setFilesToDisplay(filesArr.filter(f => f.path.split('/').slice(0, -1).join('/') === currDir));
            setFoldersToDisplay(foldersArr.filter(f => f.path.split('/').slice(0, -1).join('/') === currDir));
        }
    }, [filesArr, currDir]);


    const handleRemove = (id) => {
        setFilesArr((prevMetadataArr) => {
            const fileToRemove = prevMetadataArr.find(file => file.id === id);
            if (fileToRemove && fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }

            return prevMetadataArr.filter(file => file.id !== id);
        });
    };


    return (
        <>
            <FileViewer
                visible={fileViewerVisible}
                exit={() => {
                    setFileViewerVisible(false);
                    setTimeout(() => {
                        setSelectedImage(null);
                        setSelectedFile(null);
                    }, 250);
                }}
                imageURL={selectedImage}
                fileContent={selectedFile?.content}
                fileExtension={(selectedFile ? selectedFile.name.split('.')[1] : null)}
            />

            <DialogBox
                mode="info"
                message={`${currRenamedFile} already exists and has been automatically renamed.`}
                visible={renameConfirmVisible}
                onClose={() => setRenameConfirmVisible(false)}
            />
            <DialogBox
                mode="confirm"
                message="are you sure you want to remove all files"
                visible={clearConfirmVisible}
                onConfirm={() => {
                    setClearConfirmVisible(false);
                    filesArr.forEach((file) => {
                        if (file.preview) {
                            URL.revokeObjectURL(file.preview);
                        }
                    });
                    setFilesArr([]);
                }}
                onClose={() => setClearConfirmVisible(false)}
            />
            <div className="file-panel">
                <div className="file-container">
                    <input
                        type="file"
                        ref={fileInputRef}
                        webkitdirectory={folderUpload ? "true" : false}
                        {...getInputProps()}
                    />{" "}
                    {/* hidden input */}
                    <div className="button-container">
                        <div className="upload-select-container">
                            <button className="upload-button" onClick={open}>
                                <span className="logo">
                                    <img src={AddIcon} />
                                </span>
                                <span className="upload-text">upload</span>
                            </button>
                            <button
                                className="upload-type-select"
                                onClick={() => setFolderUpload(!folderUpload)}
                            >
                                <div
                                    className="slider"
                                    ref={sliderRef}
                                    style={
                                        !folderUpload
                                            ? {
                                                left: 0,
                                                transform: "translateX(0)",
                                                transition: "all ease-in-out 0.2s",
                                            }
                                            : {
                                                transform: "translateX(75px)",
                                                transition: "all ease-in-out 0.2s",
                                            }
                                    }
                                ></div>
                                <span
                                    className="upload-type-option"
                                    id="file-upload-option"
                                    ref={fileOptionRef}
                                >
                                    file
                                </span>
                                <span
                                    className="upload-type-option"
                                    id="folder-upload-option"
                                    ref={folderOptionRef}
                                >
                                    folder
                                </span>
                            </button>
                        </div>
                        {!isEmpty && !viewMode ?( 
                            <button className="remove-file" 
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setClearConfirmVisible(true);
                                    setCurrDir("");
                                }}
                            >
                                remove all files
                            </button>
                        ) : ("")}
                    </div>
                    <div className="navigate-dir">
                        <div className="navigate-dir-buttons">
                            <button className="navigate-dir-button"
                                id={`navigate-backward ${currDir.split('/').length < 1 ? "disabled" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrDir(currDir.split('/').slice(0, -1).join('/'));
                                }}
                            >
                                <img src={ArrowIcon} 
                                    style={{transform: "rotate(180deg)"}}
                                />
                                <span>go back</span>
                            </button>
                        </div>
                        <div className="directory-bar">
                            <button 
                                className="dir-part"
                                onClick={() => setCurrDir("")}
                            >
                                root
                            </button>
                            <div className="dir-part-separator">/</div>
                            {currDir !== '' ? (currDir.split("/").map((part, index) => {
                                return (
                                    <>
                                        <button 
                                            className="dir-part"
                                            onClick={() => {
                                                setCurrDir(currDir.split("/").slice(0, index + 1).join("/"));
                                            }}
                                        >
                                            {part}
                                        </button>
                                        <div className="dir-part-separator">/</div>
                                    </>
                                )
                            })) : ("")}
                        </div>
                    </div>
                    <div className="dropzone-root" ref={dropzoneRef} {...getRootProps()}>
                        <CSSTransition
                            in={isDropping || isEmpty}
                            classNames={"drop-screen-transition"}
                            timeout={450}
                            mountOnEnter
                            unmountOnExit
                        >
                            {dropScreen}
                        </CSSTransition>
                        {foldersToDisplay.map((folder) => {
                            return (
                                <FileItem isFolder
                                    key={folder.id}
                                    fileName={folder.name}
                                    openFile={() => {
                                        setCurrDir(folder.path);
                                    }}
                                    viewMode={viewMode}
                                    removeFile={() => {
                                        handleRemove(folder.id)
                                    }}
                                />
                            );
                        })}
                        {filesToDisplay.map((file) => {
                            return (
                                <FileItem
                                    key={file.id}
                                    fileName={file.name}
                                    fileSize={file.size}
                                    openFile={() => {
                                        if (file.type) {
                                            if (file.type.startsWith('image/')) {
                                                setSelectedFile(null);
                                                setSelectedImage(file.preview);
                                                setFileViewerVisible(true);
                                            }
                                            if (file.type.startsWith('text/')) {
                                                setSelectedImage(null);
                                                setSelectedFile(file);
                                                setFileViewerVisible(true);
                                            }
                                        }
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
    );
};

export default FileUpload;
