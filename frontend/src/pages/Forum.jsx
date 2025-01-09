// import modules
import React, { useEffect, useState } from "react";
import displayTime from "../utils/displayTime";

// import components
import MiniPost from "../components/MiniPost";

// import assets
import TerminalIcon from "../assets/terminal.svg";
import AddIcon from "../assets/add.svg";
import LoadingIcon from "../assets/loading-circle.gif"

// import styles
import "../styles/Forum.css";
import InfiniteScroll from "react-infinite-scroll-component";

const Forum = () => {
    const [forumPostData, setForumPostData] = useState([]);
    const [fetchPage, setFetchPage] = useState(1);
    const [sortButtonActive, setSortButtonActive] = useState("recent");

    const url = "/forum";

    const fetchForum = async () => {
        const response = await fetch(`http://localhost:3000/forum?page=${fetchPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            if (response.status === 404) {
                console.log("cannot fetch any post.");
            }
        } else {
            return await response.json();
        }
    };

    const getForum = async () => {
        const data = await fetchForum();
        let page = fetchPage;
        page++;
        setForumPostData(forumPostData.concat(data));
        setFetchPage(page);
    };

    useEffect (() => {
        getForum()
    }, [])

    const getTimeSincePost = (createdAt) => {
        const now = new Date();
        const creationTime = new Date(createdAt);
        return (now.getTime() - creationTime.getTime()) / 1000;
    };

    return (
        <div className="page-content">
            <div className="forum-content">
                <div className="post-header" id="post-header">
                    <span className="header-icon">
                        <img src={TerminalIcon} alt="T"></img>
                    </span>
                    <span className="header-title">sharing</span>
                </div>
                <div className="post-options">
                    <button className="create-post-button">
                        <span className="create-post-button-logo">
                            <img src={AddIcon}></img>
                        </span>
                        <span className="create-post-button-title">create post</span>
                    </button>
                    <div className="post-sort-buttons">
                        <button
                            className={`sort-post-button${
                                sortButtonActive === "recent" ? "-active" : ""
                            }`}
                            id="sort-by-recent"
                            onClick={() => {
                                setSortButtonActive("recent");
                            }}
                        >
                            recent
                        </button>
                        <button
                            className={`sort-post-button${
                                sortButtonActive === "relevant" ? "-active" : ""
                            }`}
                            id="sort-by-relevant"
                            onClick={() => {
                                setSortButtonActive("relevant");
                            }}
                        >
                            relevant
                        </button>
                        <button
                            className={`sort-post-button${
                                sortButtonActive === "upvotes" ? "-active" : ""
                            }`}
                            id="sort-by-upvotes"
                            onClick={() => {
                                setSortButtonActive("upvotes");
                            }}
                        >
                            upvotes
                        </button>
                    </div>
                </div>
                
                    {forumPostData ? (
                        <InfiniteScroll
                            dataLength={forumPostData.length}
                            next={getForum}
                            hasMore={true}
                            loader={
                                <div className="loading-container">
                                    <div className="loading-header">
                                        <span className="loading-icon">
                                            <img src={LoadingIcon} alt="T"></img>
                                        </span>
                                        <span className="loading-text">loading more posts</span>
                                    </div>
                                </div>
                            }
                        >
                            <div className="post-container">
                                {forumPostData.map((forumPost) => {
                                    return (
                                        <MiniPost
                                            postId={forumPost._id}
                                            author={null}
                                            postTitle={forumPost.title}
                                            timeSincePost={displayTime(
                                                getTimeSincePost(forumPost.createdAt)
                                            )}
                                            postTags={null}
                                            postContent={forumPost.content}
                                            topLevelFolder={null}
                                        />
                                    );
                                })}
                                
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <div>cannot find post</div>
                    )}
            </div>
        </div>
    );
};

export default Forum;
