// import modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import displayTime from "../utils/displayTime";

// import components
import MiniPost from "../components/MiniPost";
import Loader from "../components/Loader";

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
    const [hasMore, setHasMore] = useState(true);

    const navigate = useNavigate();

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
        if (data.length < 10) {
            setHasMore(false);
        }
        page++;
        setForumPostData(forumPostData.concat(data));
        setFetchPage(page);
    };

    useEffect (() => {
        getForum();
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
                    <button className="create-post-button" onClick={() => navigate('/post/create')}>
                        <span className="create-post-button-logo">
                            <img src={AddIcon}></img>
                        </span>
                        <span className="create-post-button-title" onClick={() => navigate('/post/create')}>create post</span>
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
                            next={() => {
                                setTimeout(() => getForum(), 200);
                            }}
                            hasMore={hasMore}
                            scrollThreshold={0.99}
                            loader={
                                <Loader />
                            }
                            endMessage={
                                <div className="end-message">
                                    you've reached the end! come back later for more
                                </div>
                            }
                        >
                            <div className="post-container">
                                {forumPostData.map((forumPost) => {
                                    return (
                                        <MiniPost
                                            key={forumPost._id}
                                            postId={forumPost._id}
                                            author={forumPost.author.name}
                                            postTitle={forumPost.title}
                                            timeSincePost={displayTime(
                                                getTimeSincePost(forumPost.createdAt)
                                            )}
                                            postTags={null}
                                            postContent={forumPost.content}
                                            codeLanguage={forumPost.code?.language}
                                            voteCount={forumPost.votes}
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