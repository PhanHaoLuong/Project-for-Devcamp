import React, { useState, useEffect } from 'react';
import '../styles/Avatar.css';

const Avatar = ({ id, name }) => {
  const defaultAvatar = "default.png";
  
  const [avatar, setAvatar] = useState('placeholder.png');

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await fetch(`http://localhost:3000/avatar/${id}`);
        const data = await res.json();
        
        if (data.avatarName) {
          setAvatar(data.avatarName);
        } else {
          setAvatar(defaultAvatar);
        }        
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.warn('Avatar not found, using default avatar.');
          setAvatar(defaultAvatar);
        } else {
          console.error('Error fetching avatar:', err);
        }
      }
    };
    fetchAvatar();
    
  }, [id]);

  return (
    <img
      className="avatar"
      src={`http://localhost:3000/uploads/avatars/${avatar}`}
      alt={`${name || "User"}'s avatar`}
    />
  );
};

export default Avatar;