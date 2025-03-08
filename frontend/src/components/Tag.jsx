// import modules
import React from "react";

// import styles
import '../styles/Tag.css'

const Tag = ({ tagName, onClick }) => {
    return (
        <div className="tag" 
            onClick={onClick}
            style={{
                userSelect: 'none',
                borderRadius: "10px",
                minHeight: "30px",
            }}
        >
            {tagName}
        </div>
    )
}

export default Tag;