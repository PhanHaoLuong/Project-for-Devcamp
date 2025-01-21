import React, { useState, useEffect } from 'react';
import '../styles/Avatar.css';

const Avatar = ({ id, name }) => {
  const defaultAvatar = "/uploads/avatars/default.png";
  
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}/avatar`);
        if (!response.ok) {
          throw new Error(`Failed to fetch avatar. Status: ${response.status}`);
        }

        const data = await response.json();
        setAvatar(data.avatarUrl);
      } catch (error) {
        console.error("Error fetching avatar:", error);
        setAvatar(defaultAvatar);
      }
    };

    if (id) {
      fetchAvatar();
    }
  }, [id, defaultAvatar]);

  return (
    <img
      className="avatar"
      src={`http://localhost:3000${avatar}`}
      alt={`${name || "User"}'s avatar`}
    />
  );
};

export default Avatar;