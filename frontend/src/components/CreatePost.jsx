import React from "react";
import "../styles/CreatePost.css";
import "../assets/post.png";

function CreatePost() {
  return (
    <div className="main-container">
      <div className="frame">
        <div className="header">
          <div className="create-post-title">
            <span className="create-post-text">create post</span>
          </div>
        </div>
        <span className="title">Title</span>
        <input className="title-space" />
        <span className="tags-text">Tags</span>
        <button className="tag-adder-button">
           add tags
        </button>
        <span className="description-text">Description</span>
        <textarea className="description-space" />
          <button className="write-code-button">
            Write code
          </button>
          <button className="add-files-button">
            Add files
          </button>
        </div>
      </div>
  );
}

export default CreatePost;