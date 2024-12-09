import React from 'react';

function Input({ type, placeholder, onChange, value }) {
  return (
    <input type={type} placeholder={placeholder} onChange={onChange} value={value} />
  );
}

export default Input;