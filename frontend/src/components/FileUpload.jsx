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

const FileUpload = ({ existingFilesArr, viewMode, setParentFiles, exit }) => {
    // file and folder management
    const [filesArr, setFilesArr] = useState([]);
    const [foldersToDisplay, setFoldersToDisplay] = useState([]);
    const [filesToDisplay, setFilesToDisplay] = useState([]);
    const [foldersArr, setFoldersArr] = useState([]);

    // navigate folders and files
    const [hiddenDirVisible, setHiddenDirVisible] = useState(false);
    const [currDir, setCurrDir] = useState('');
    const [currDirParts, setCurrDirParts] = useState([]);
    const [dirPartsToDisplay, setDirPartsToDisplay] = useState([]);
    const [hiddenDirParts, setHiddenDirParts] = useState([]);
    const hiddenDirRef = useRef(null);

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

    // file upload progress state
    const fileInputRef = useRef(null);
    const dropzoneRef = useRef(null);

    const sliderRef = useRef(null);
    const folderOptionRef = useRef(null);
    const fileOptionRef = useRef(null);

    const [dirBarOverflowing, setDirBarOverflowing] = useState(false);
    const dirBarRef = useRef(null);

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
                if (!createdFolders[currPath] && !foldersArr.some(f => f.path === currPath)) {
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

    const { acceptedFiles, getRootProps, getInputProps, open, isDragActive } = useDropzone({
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
                            path: currDir ? `${currDir}/${file.webkitRelativePath || file.name}` : file.webkitRelativePath,
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
        setFilesArr(existingFilesArr);
        if (existingFilesArr.length) {
            setFoldersArr(handleFolderCreation(existingFilesArr));
        }
    }, []);


    useEffect(() => {
        return () => {
            // cleanup, revoke preview urls when unmount
            filesArr.forEach((file) => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, []);


    useEffect(() => {
        if (!filesArr.length && !foldersArr.length) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [filesArr]);

    useEffect(() => {
        if (dirBarRef.current) {
            const offsetWidth = dirBarRef.current.offsetWidth;
            const scrollWidth = dirBarRef.current.scrollWidth;
            if (scrollWidth > offsetWidth) {
                setHiddenDirParts(prevHiddenParts => [...prevHiddenParts, dirPartsToDisplay[0]]);
                setDirPartsToDisplay(prevDisplay => prevDisplay.slice(1));
                console.log("overflowing");
            } else {
                console.log("not overflowing");
            }
        }
    }, [dirPartsToDisplay]);


    useEffect(() => {
        if (currDir === "") {
            setFilesToDisplay(filesArr.filter(f => f.path.split('/').length === 1)); 
            setFoldersToDisplay(foldersArr.filter(f => f.path.split('/').length === 1)); 
        } else {
            setFilesToDisplay(filesArr.filter(f => f.path.split('/').slice(0, -1).join('/') === currDir));
            setFoldersToDisplay(foldersArr.filter(f => f.path.split('/').slice(0, -1).join('/') === currDir));
        }

        if (currDir) {
            setCurrDirParts(currDir.split("/").map((part, index) => {
                return {
                    name: part,
                    navigateTo: currDir.split("/").slice(0, index + 1).join("/")
                };
            }));
        } else {
            setCurrDirParts([]);
        }


    }, [filesArr, currDir]);


    useEffect(() => {
        setDirPartsToDisplay(currDirParts);
        setHiddenDirParts([]);
    }, [currDirParts]);


    const handleFileRemove = (id) => {
        setFilesArr((prevFilesArr) => {
            const fileToRemove = prevFilesArr.find(file => file.id === id);
            if (fileToRemove && fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }

            return prevFilesArr.filter(file => file.id !== id);
        });
    };

    const handleFolderRemove = (id) => {
        setFoldersArr(prevFoldersArr => {
            const folderToRemove = prevFoldersArr.find(folder => folder.id === id);
            setFilesArr(prevFilesArr => {
                return prevFilesArr.filter(file => file.path.startsWith(folderToRemove.path))
            });
            return prevFoldersArr.filter(folder => folder.id !== id);
        })

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
                    setCurrDir("");
                    setFilesToDisplay([]);
                    setFoldersToDisplay([]);
                    filesArr.forEach((file) => {
                        if (file.preview) {
                            URL.revokeObjectURL(file.preview);
                        }
                    });
                    setFilesArr([]);
                    setFoldersArr([]);
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
                            {!viewMode ? (
                                <>
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
                                </>
                            ) : ("")}
                        </div>
                        {!isEmpty && !viewMode ?( 
                            <button className="remove-file" 
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setClearConfirmVisible(true);
                                }}
                            >
                                remove all files
                            </button>
                        ) : ("")}
                    </div>
                    <div className="navigate-dir">
                        <div className="navigate-dir-buttons">
                            <button className={`navigate-dir-button ${!currDir ? "disabled" : "enabled"}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrDir(currDir.split('/').slice(0, -1).join('/'));
                                }}
                                disabled={!currDir}
                            >
                                <img src={ArrowIcon} 
                                    style={{transform: "rotate(180deg)"}}
                                />
                            </button>
                        </div>
                        {hiddenDirVisible ? (
                            <div className="hidden-dir-dropdown">
                                {hiddenDirParts.map(part => {
                                    return (
                                        <>
                                            <button 
                                                className="dir-part"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrDir(part.navigateTo);
                                                }}
                                            >
                                                {part.name}
                                            </button>
                                        </>
                                    )
                                })}
                            </div>
                        ) : ("")}
                        <div className="directory-bar"
                            ref={dirBarRef}
                        >
                            
                            <button 
                                className="dir-part"
                                onClick={() => setCurrDir("")}
                            >
                                root
                            </button>
                            <div className="dir-part-separator">/</div>
                            {hiddenDirParts.length ? (
                                <>
                                    <button 
                                        className="dir-part"
                                        id="hidden-dir-dropdown-button"
                                        ref={hiddenDirRef}
                                        onClick={() => {
                                            if (hiddenDirRef) {
                                                hiddenDirRef.current.focus();
                                            }
                                        }}
                                        onFocus={() => {
                                            setHiddenDirVisible(true);
                                        }}
                                        onBlur={() => {
                                            setTimeout(() => setHiddenDirVisible(false), 100)
                                        }}
                                    >
                                        {"..."}
                                    </button>
                                    <div className="dir-part-separator">/</div>
                                </>
                            ) : ("")}
                            
                            {dirPartsToDisplay.length ? (dirPartsToDisplay.map(part => {
                                return (
                                    <>
                                        <button 
                                            className="dir-part"
                                            onClick={() => {
                                                setCurrDir(part.navigateTo);
                                            }}
                                        >
                                            {part.name}
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
                        {!(filesToDisplay.length || foldersToDisplay.length || isEmpty) ? (
                            <div className="folder-empty-message">
                                this folder is empty.
                            </div>
                        ) : ("")}
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
                                        handleFolderRemove(folder.id)
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
                                        handleFileRemove(file.id);
                                    }}
                                />
                            );
                        })}
                    </div>
                    <div className="bottom-buttons-container">
                        <button className="return-to-post-button"
                            onClick={() => exit()}
                        >
                            cancel
                        </button>
                        <button className={`confirm-button ${!isEmpty ? "enabled" : "disabled"}`}
                            onClick={() => {
                                if (!isEmpty) {
                                    setParentFiles(filesArr);
                                    exit();
                                }
                            }}
                        >
                            confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FileUpload;
