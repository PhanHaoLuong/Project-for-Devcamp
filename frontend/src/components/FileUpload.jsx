// import modules
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Dropzone, { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import ellipsis from "../utils/ellipsis";

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

const FileUpload = ({ viewModeFetchContent, existingFilesArr, viewMode, setParentFiles, exit }) => {
    // file and folder management
    const [filesArr, setFilesArr] = useState([]);
    const [foldersToDisplay, setFoldersToDisplay] = useState([]);
    const [filesToDisplay, setFilesToDisplay] = useState([]);
    const [foldersArr, setFoldersArr] = useState([]);

    // state condition to fetch all after first click
    const [isViewModeClicked, setViewModeClicked] = useState(false);

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
    const [currRenamedFiles, setCurrRenamedFiles] = useState([]);
    const [fileRejectedErr, setFileRejectedErr] = useState(false);
    const [rejectedFilesArr, setRejectedFilesArr] = useState([]);

    // preview files states
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
                setCurrRenamedFiles(prevRenamedFiles => [...prevRenamedFiles, newFile.name]);
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

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
            accept: {
                'text/x-c++src': ['.cpp'], 
                'text/x-csharp': ['.cs'], 
                'application/x-python-code': ['.py'], 
                'application/javascript': ['.js', '.jsx'], 
                'application/typescript': ['.ts', '.tsx'], 
                'text/x-java': ['.java'], 
                'application/x-go': ['.go'], 
                'text/x-rust': ['.rs'], 
                'text/swift': ['.swift'],
                'text/plain': ['.txt']
            },

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
                            fileObj: file,
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

            onDropRejected: (rejectedFiles) => {
                setFileRejectedErr(true);
                setRejectedFilesArr(rejectedFiles);
            },

            disabled: viewMode,
            noClick: !isEmpty,
            useFsAccessApi: false,
        });

    

    useEffect(() => {
        // create folders for viewmode files if in viewmode
        setFilesArr(existingFilesArr);
        if (existingFilesArr && existingFilesArr?.length) {
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
        setFilesArr(existingFilesArr);
        if (existingFilesArr && existingFilesArr?.length) {
            setFoldersArr(handleFolderCreation(existingFilesArr));
        }
        if (selectedFile) {
            setSelectedFile(existingFilesArr.find(file => file.id === selectedFile.id));
        }                          
    }, [existingFilesArr])

    useEffect(() => {
        if (dirBarRef.current) {
            const offsetWidth = dirBarRef.current.offsetWidth;
            const scrollWidth = dirBarRef.current.scrollWidth;
            if (scrollWidth > offsetWidth) {
                setHiddenDirParts(prevHiddenParts => [...prevHiddenParts, dirPartsToDisplay[0]]);
                setDirPartsToDisplay(prevDisplay => prevDisplay.slice(1));
            } else {
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


    useEffect(() => {
        if (fileViewerVisible) {
            document.body.classList.add('no-scroll');
          } else {
            document.body.classList.remove('no-scroll');
          }
          return () => document.body.classList.remove('no-scroll');
    }, [fileViewerVisible])


    const handleFileRemove = (id) => {
        setFilesArr((prevFilesArr) => {
            const fileToRemove = prevFilesArr.find(file => file.id === id);

            // revoke the preview url if it exists
            if (fileToRemove && fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }

            // remove the file
            return prevFilesArr.filter(file => file.id !== id);
        });
    };

    const handleFolderRemove = (id) => {
        setFoldersArr(prevFoldersArr => {
            const folderToRemove = prevFoldersArr.find(folder => folder.id === id);

            // remove all files in the folder
            setFilesArr(prevFilesArr => {
                return prevFilesArr.filter(file => file.path.startsWith(folderToRemove.path))
            });

            // remove the folder
            return prevFoldersArr.filter(folder => folder.id !== id);
        })

    };


    return (
        <>
            <FileViewer
                fileName={selectedFile?.name}
                visible={fileViewerVisible}
                exit={() => {
                    setFileViewerVisible(false);
                    setTimeout(() => {
                        setSelectedFile(null);
                    }, 250);
                }}
                fileContent={selectedFile?.content}
                fileExtension={(selectedFile ? selectedFile.name.split('.')[1] : null)}
            />

            <DialogBox
                mode="info"
                message={`${currRenamedFiles.length === 1 ? (
                    currRenamedFiles[0] + ' already exists and has'
                ) : (
                    currRenamedFiles.length + ' files already exist and have'
                )} been automatically renamed.`}
                
                visible={renameConfirmVisible}
                onClose={() => {
                    setTimeout(() => setCurrRenamedFiles([]), 300)
                    setRenameConfirmVisible(false);
                }}
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
            <DialogBox
                mode="error"
                message={
                    rejectedFilesArr?.length !== 1 ? (
                        `${rejectedFilesArr.length} files are unsupported and were not uploaded.`
                    ) : (
                        `the file "${ellipsis(rejectedFilesArr[0].file.name, 64)}" is unsupported and was not uploaded.`
                    )
                }
                visible={fileRejectedErr}
                onClose={() => {
                    setFileRejectedErr(false);
                    setTimeout(setRejectedFilesArr([]), 400);
                }}
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
                                style={{userSelect: "none"}}
                            >
                                root
                            </button>
                            <div className="dir-part-separator" style={{userSelect: "none"}}>/</div>
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
                                            style={{userSelect: "none"}}
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
                                        const displayData = () => {
                                            if (file.type) {
                                                if (file.type.startsWith('text/')) {
                                                    setSelectedFile(file);
                                                    setFileViewerVisible(true);
                                                }
                                            }
                                        };

                                        if (!viewMode) {
                                            displayData();
                                        } else {
                                            if (!isViewModeClicked) {
                                                setViewModeClicked(true);
                                                viewModeFetchContent()
                                                    .then(() => {
                                                        setFilesArr(existingFilesArr);
                                                        if (existingFilesArr && existingFilesArr?.length) {
                                                            setFoldersArr(handleFolderCreation(existingFilesArr));
                                                        }
                                                    })
                                                    .then(displayData)
                                            } else {
                                                displayData();
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
                    {!viewMode ? (
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
                    ) : ""}
                </div>
            </div>
        </>
    );
};

export default FileUpload;
