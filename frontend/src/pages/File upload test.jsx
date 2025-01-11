import React, { useState } from 'react';

const Fileupload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    console.log(selectedFile)
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append('file', selectedFile[i]);
    }
    console.log(formData)
  

    try {
      const response = await fetch('http://localhost:3000/fileupload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} multiple/>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Fileupload;