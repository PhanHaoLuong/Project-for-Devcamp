import React from "react";

import LoadingIcon from "../assets/loading-circle.gif";

import '../styles/Loader.css'

const Loader = () => {
    return (
        <div className="loading-container">
            <div className="loading-header">
                <span className="loading-icon">
                    <img src={LoadingIcon} alt="T" />
                </span>
                <span className="loading-text">loading more posts</span>
            </div>
        </div>
    );
}

export default Loader;