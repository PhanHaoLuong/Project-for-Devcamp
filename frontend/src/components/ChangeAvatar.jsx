import React, { useEffect, useState } from 'react';
import '../styles/ChangeAvatar.css';
import { axiosInstance } from '../lib/axios';

const ChangeAvatar = ({ user, isAvatarPopupOpen, setIsAvatarPopupOpen }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const closeModal = (event) => {
    const modal = document.querySelector('.upload-modal-content');
    if (isAvatarPopupOpen && !modal.contains(event.target)) {
      setIsAvatarPopupOpen(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission to update avatar
  const handleAvatarUpdate = async (e) => {
    if (!user) {
      return alert('User is not logged in or user ID is missing.');
    }
  
    if (!selectedFile) {
      return alert('Please select an image!');
    }
    
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('avatar', selectedFile);

    try {
      const response = await axiosInstance.post('/avatar/upload', formData,);
      setIsAvatarPopupOpen(false);
    } catch (error) {
      console.error('Error updating avatar:', error);
      alert('Failed to update avatar. Please try again.');
    }
    location.reload();
  };

  return (
    <div>
      {/* Modal Structure */}
        <div className="upload-modal" id="avatarModal" style={{ display: 'flex' }} onClick={closeModal}>
          <div className="upload-modal-content">
            <div className="upload-modal-header">
              <h5 className="upload-modal-title">Change Avatar</h5>
              <button type="button" className="close" onClick={() => setIsAvatarPopupOpen(false)}>&times;</button>
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