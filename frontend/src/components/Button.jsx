import React from 'react';

function Button({ onClick, className, children, type, id, style, onMouseEnter, onMouseLeave }) {
    return (
        <button type={type} className={className} onClick={onClick} id={id} style={style} 
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
        </button>
    )
};

export default Button;