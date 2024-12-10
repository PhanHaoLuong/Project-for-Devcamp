import React from 'react';

function Input({ id, type, children, placeholder, onChange, value, className="input-field" }) {
  return (
    <input type={type} id={id} placeholder={placeholder} onChange={onChange} value={value} className={className}>{children}</input>
  );
}

export default Input;