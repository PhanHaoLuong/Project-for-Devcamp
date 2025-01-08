// import modules
import React from "react";

// import styles
import '../styles/Tag.css'

const Tag = ({ tagName }) => {
    return (
        <div className="tag" >
            {tagName}
        </div>
    )
}

export default Tag;