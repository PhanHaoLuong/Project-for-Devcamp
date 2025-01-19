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
    if (!user || !user.id) {
      return alert('User is not logged in or user ID is missing.');
    }

    if (!selectedFile) {
      return alert('Please select an image!');
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);
    formData.append('userId', user.id);

    try {
      const response = await fetch('http://localhost:3000/avatar/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Avatar updated successfully!');
        onAvatarUpdate(data.avatar.imageUrl);
        closeModal();
      } else {
        alert(data.error || 'Failed to update avatar.');
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  return (
    <div>
      {/* Modal Structure */}
      {modalVisible && (
        <div className="upload-modal" id="avatarModal" style={{ display: 'flex' }}>
          <div className="upload-modal-content">
            <div className="upload-modal-header">
              <h5 className="upload-modal-title">Change Avatar</h5>
              <button type="button" className="close" onClick={closeModal}>&times;</button>
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
      )}
    </div>
  );
};

export default ChangeAvatar;