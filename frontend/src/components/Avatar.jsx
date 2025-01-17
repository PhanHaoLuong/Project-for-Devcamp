import React, { useState, useEffect } from 'react';
import '../styles/Avatar.css';
import defaultAvatar from '../assets/profile_pictures/default.png';

const Avatar = ({ user }) => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [name, setName] = useState('');

  useEffect(() => {
    if (user && user.avatar) {
      setAvatar(user.avatar); 
      setName(user.name);
    }
  }, [user]);

  return (
    <img
      className="avatar"
      src={avatar}
      alt={`${name || "User"}'s avatar`}
    />
  );
}

export default Avatar;