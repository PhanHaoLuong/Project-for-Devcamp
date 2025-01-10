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

    return (
        <>
            <input type="file" onChange={handleFileChange}></input>
            {fileMetadataArr ? (
                fileMetadataArr.map((fileMetadata) => {
                    return (
                      <FileItem isUploading={true}
                        fileName={fileMetadata.name}
                        fileSize={fileMetadata.size}
                        removeFile={() => handleRemove(fileMetadata.id)}
                      />  
                    );
                })
            ) : ("")}
        </>
    )
}

export default DisplayUpload;