import React, { useState } from 'react';
import '../styles/ChangeAvatar.css';

const ChangeAvatar = ({ user, onAvatarUpdate, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission to update avatar
  const handleAvatarUpdate = async () => {
    if (!user) {
      console.log(user);
      return alert('User is not logged in or user ID is missing.');
    }
  
    if (!selectedFile) {
      return alert('Please select an image!');
    }
  
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    formData.append('userId', user._id);
  
    try {
      const response = await fetch('http://localhost:3000/avatar/upload', {
        method: 'POST',
        body: formData,
      });
  
      console.log('Response status:', response.status);
      const responseBody = await response.text();
      console.log('Response body:', responseBody);
  
      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }
  
      const data = JSON.parse(responseBody);
      onAvatarUpdate(data.avatar);
      onClose();
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  return (
    <div>
      {/* Modal Structure */}
        <div className="upload-modal" id="avatarModal" style={{ display: 'flex' }}>
          <div className="upload-modal-content">
            <div className="upload-modal-header">
              <h5 className="upload-modal-title">Change Avatar</h5>
              <button type="button" className="close" onClick={onClose}>&times;</button>
            </div>
            <div className="upload-modal-body">
              <form id="avatarForm" encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="profile_picture" className="upload-label">Select Profile Picture:</label>
                  <input
                    type="file"
                    id="profile_picture"
                    name="avatar"
                    accept="image/*"
                    required
                    className="form-control upload-input"
                    onChange={handleFileChange}
                  />
                  <small className="text-muted">Allowed formats: JPG, PNG, JPEG</small>
                </div>
                {preview && <img src={preview} alt="Preview" className="preview" />}
              </form>
            </div>
            <div className="upload-modal-footer">
              <button type="button" className="btn" onClick={handleAvatarUpdate}>
                Upload
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ChangeAvatar;