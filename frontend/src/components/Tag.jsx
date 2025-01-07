// import modules
import React from "react";

// import styles
import '../styles/Tag.css'

const Tag = ({ tagName }) => {
    return (
        <div className="tag" 
            onMouseEnter={
                () => {setTagHoverIndex(index)}
            }
            onMouseLeave={
                () => {setTagHoverIndex(null)}
            }
        >
            {tagName}
        </div>
    )
}

export default Tag;