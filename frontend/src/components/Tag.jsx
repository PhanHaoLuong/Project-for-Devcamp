// import modules
import React from "react";

// import styles
import '../styles/Tag.css'

const Tag = ({ tagName, onClick }) => {
    return (
        <div className="tag" 
            onClick={onClick}
        >
            {tagName}
        </div>
    )
}

export default Tag;