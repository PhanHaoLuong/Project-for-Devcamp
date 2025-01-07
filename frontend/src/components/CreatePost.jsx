import React from "react";
import "../styles/CreatePost.css";
import "../assets/post.png";

export default function CreatePost() {
  return (
    <div className="main-container">
      <div className="frame">
        <div className="flex-row-f">
          <div className="icon-create-post">
            <div className="post-icon" />
            <span className="create-post-text">create post</span>
          </div>
          <div className="upper-bar" />
        </div>
        <span className="title">Title</span>
        <input className="title-space" />

        <span className="tags-text">Tags</span>
        <button className="tag-adder-button">
        <div className="box-2">
            <span className="plus">+</span>
            <span className="tag"> Tag</span>
          </div>
          <div className="tag-adder" />
        </button>

        <span className="description-text">Description</span>
        <input className="description-space" />
        <div className="flex-row-e">
          <button className="write-code-button">
            <span className="write-code-text">Write code</span>
          </button>
        
          <button className="add-files-button">
              <span className="add-files">Add files</span>
           
          </button>
        </div>
      </div>
    </div>
  );
}
