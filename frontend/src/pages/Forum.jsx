// import modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import displayTime from "../utils/displayTime";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

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
    const userData = useAuthStore((state) => state.userData);

    const fetchForum = async () => {
        const response = await fetch(`/forum?page=${fetchPage}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log("cannot fetch any post.");
            }
        } else {
            const data = response.json();
            return data;
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

    const handleCreatePostClick = () => {
        if (!userData) {
            toast.error("You have to log in first!");
        } else {
            navigate("/post/create");
        }
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
                    <button className="create-post-button" onClick={handleCreatePostClick}>
                        <span className="create-post-button-logo">
                            <img src={AddIcon}></img>
                        </span>
                        <span className="create-post-button-title" >create post</span>
                    </button>
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