import React from 'react';

function Button({ onClick, className, children, type }) {
    return (
        <button type={type} className={className} onClick={onClick}>
            {children}
        </button>
    )
};

export default Button;