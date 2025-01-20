import React, { useState, useEffect } from 'react';
import '../styles/Avatar.css';
import { redirect } from 'react-router-dom';

const Avatar = ({ id, name }) => {
  const defaultAvatar = "/uploads/avatars/default.png";
  
  const [avatar, setAvatar] = useState(defaultAvatar);

  // useEffect(() => {
  //   const fetchAvatar = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/avatar/${id}`);
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch avatar. Status: ${response.status}`);
  //       }
  
  //       const url = await response.json();
  //       setAvatar(url);

  //     } catch (error) {
  //       console.error("Error fetching avatar:", error);
  //       setAvatar(defaultAvatar);
  //     }
  //   };

  //   fetchAvatar();

  // }, [id]);

  return (
    <img
      className="avatar"
      src={`http://localhost:3000${avatar}`}
      alt={`${name || "User"}'s avatar`}
    />
  );
};

export default Avatar;
