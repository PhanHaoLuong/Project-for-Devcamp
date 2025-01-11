import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import FileItem from "./FileItem";

import '../styles/FileUpload.css'


const DisplayUpload = () => {
    const [fileMetadataArr, setFileMetadataArr] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newFileMetadata = {
                id: uuidv4(),
                name: file.name,
                size: file.size
            }
            setFileMetadataArr(prevMetadataArr => 
                [...prevMetadataArr, newFileMetadata]
            )
        }
    }

    const handleRemove = (id) => {
        setFileMetadataArr(prevMetadataArr =>
            prevMetadataArr.filter(file => file.id !== id)
        );
    }

    const handleFileSubmit = async () => {
        if (!fileMetadataArr) {
            alert("please select a file to upload.");
        } else {
            const formData = new FormData();
        }
    }

    return (
        <>
            {/* test upload button */}
            <input type="file" onChange={handleFileChange}></input>

            {/* test submit button */}
            <button></button>
            <div className="file-container">
                {fileMetadataArr ? (
                    fileMetadataArr.map((fileMetadata) => {
                        return (
                            <FileItem key={fileMetadata.id}
                                isUploading={true}
                                fileName={fileMetadata.name}
                                fileSize={fileMetadata.size}
                                removeFile={() => handleRemove(fileMetadata.id)}
                            />  
                        );
                    })
                ) : ("")}
            </div>
        </>
    )
}

export default DisplayUpload;