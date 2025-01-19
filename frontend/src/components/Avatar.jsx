import React, { useState, useEffect } from 'react';
import '../styles/Avatar.css';
import defaultAvatar from '../assets/profile_pictures/default.png';

const Avatar = ({ user }) => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [name, setName] = useState('');

  useEffect(() => {
    if (user && user.id) {
      // Fetch the avatar from the backend using the user's id
      fetch(`http://localhost:3000/avatar/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.avatar) {
            setAvatar(data.avatar.imageUrl); // Set the avatar URL returned from backend
          }
          setName(user.name); // Set the username
        })
        .catch((error) => {
          console.error('Error fetching avatar:', error);
        });
    }
  }, [user]);

  return (
    <img
      className="avatar"
      src={avatar}
      alt={`${name || "User"}'s avatar`}
    />
  );
};

export default Avatar;
