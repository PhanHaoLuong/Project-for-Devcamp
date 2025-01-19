// import modules
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import displayTime from "../utils/displayTime";
import InfiniteScroll from "react-infinite-scroll-component";

//import components
import FullPost from "../components/FullPost";
import AddIcon from "../assets/add.svg";
import Loader from "../components/Loader";

// import styles
import '../styles/FullPostPage.css'

const FullPostPage = () => {
    // states for inf scroll
    const [hasMore, setHasMore] = useState(true);
    const [fetchPage, setFetchPage] = useState(1);

    const [postData, setPostData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [acceptedComment, setAcceptedComment] = useState([])

    const navigate = useNavigate();
    const { postId } = useParams();

    const fetchPost = async () => {
        try {
            const response = await fetch(`http://localhost:3000/post/${postId}?page=${fetchPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                if (response.status === 404) {
                    console.log('post not found')
                }
                return null;
            } else {
                const data = await response.json()
                return data;
            }
        } catch (error) {
            console.log('cannot fetch posts. error: ', error);
            return null;
        }
    }

    const getPostData = async () => {
        let page = fetchPage;
        const data = await fetchPost();
            if (page === 1) {
                setPostData(data.post);
                if (data.accepted_comment) {
                    setAcceptedComment(data.accepted_comment);
                }
            }
        
            const newComments = data.comments || [];
            setCommentData([...(commentData || []), ...newComments]);
            if (newComments.length < 5) {
                setHasMore(false);
            }
            page++;
            setFetchPage(page);
        console.log(1)
    }

    useEffect(() => {
        getPostData();
    }, [])
    

    const getTimeSincePost = (createdAt) => {
        const now = new Date();
        const creationTime = new Date(createdAt);
        return (now.getTime() - creationTime.getTime()) / 1000;
    }
    return (
        <>
            <div className="fullpost-window" id="fullpost-window">
                <div className="fullpost-container">
                    {postData ? (<FullPost isComment={false} 
                        author={postData.author.name || null} 
                        postTitle={postData.title || null}
                        timeSincePost={displayTime(getTimeSincePost(postData.createdAt))}
                        voteCount={postData.votes} 
                        postTags={null} /* placeholder */
                        postContent={postData.content || null}
                        codeContent={postData.code || null}
                        folderContent={null} /* placeholder */
                    />) : ("")}
                    <InfiniteScroll
                        dataLength={
                            (commentData?.length || 0) + (acceptedComment?.length || 0)
                        }
                        next={() => setTimeout(() => getPostData(), 1000)}
                        hasMore={hasMore}
                        scrollThreshold={0.99}
                        loader={<Loader />}
                        endMessage={
                            <div className="end-message">
                                you've reached the end! come back later for more
                            </div>
                        }
                    >
                            {acceptedComment.length ? (
                                <FullPost isComment={true} isAccepted={true}
                                    author={acceptedComment?.author?.name || "N/A"} 
                                    postTitle={acceptedComment.title || "N/A"}
                                    timeSincePost={displayTime(getTimeSincePost(acceptedComment.createdAt))}
                                    postTags={null} // placeholder 
                                    postContent={acceptedComment.content || null}
                                    codeContent={acceptedComment.code || null}
                                    folderContent={null} // placeholder 
                                />
                                )
                            : ("")} 
                            {commentData.length ? (
                                commentData.map((comment) => {
                                    return (
                                        <FullPost isComment={true} isAccepted={false}
                                            author={comment.author.name || "N/A"} 
                                            postTitle={comment.title || "N/A"}
                                            timeSincePost={displayTime(getTimeSincePost(comment.createdAt))}
                                            postTags={null} // placeholder 
                                            postContent={comment.content || null}
                                            codeContent={comment.code || null}
                                            folderContent={null} // placeholder 
                                        />
                                    )
                                })
                        ) : ("")} 
                    </InfiniteScroll>
                    
                </div>
                <button className="comment-button"
                    onClick={() => {navigate("./comment", {state: {postData: postData}})}}
                >
                    <span className="comment-logo">
                        <img src={AddIcon}></img>
                    </span>
                    <span className="comment-button-title">comment</span>
                </button>
            </div>
        </>
    )
}

export default FullPostPage;