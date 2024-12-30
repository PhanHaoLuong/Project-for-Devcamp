import React, { useState, useEffect } from 'react';
import '../assets/css/avatar.css';
import defaultAvatar from '../assets/profile_pictures/default.png';

const Avatar = ({ user }) => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar);
    } else {
      setAvatar(defaultAvatar);
    }
  }, [user]);

  return (
    <img className="avatar" src={avatar} alt={`${user.name}'s avatar`} />
  );
};

export default Avatar;