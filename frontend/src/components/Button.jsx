import React from 'react';

function Button({ onClick, className, children, type, id }) {
    return (
        <button type={type} className={className} onClick={onClick} id={id}>
            {children}
        </button>
    )
};

export default Button;