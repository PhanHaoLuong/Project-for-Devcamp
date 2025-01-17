import React, { useState } from 'react';
import '../styles/ChangeAvatar.css';

const ChangeAvatar = ({ user, onAvatarUpdate, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarUpdate = async () => {
    if (!selectedFile) return alert('Please select an image!');

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
        onClose();
      } else {
        alert(data.error || 'Failed to update avatar.');
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  return (
    <div className="change-avatar-popup">
      <div className="popup-content">
        <h3>Update Avatar</h3>
        <input type="file" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" className="preview" />}
        <button onClick={handleAvatarUpdate}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ChangeAvatar;
