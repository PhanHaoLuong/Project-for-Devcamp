// import modules
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import displayTime from "../utils/displayTime";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

//import components
import FullPost from "../components/FullPost";
import AddIcon from "../assets/add.svg";
import Loader from "../components/Loader";

// import styles
import '../styles/FullPostPage.css'

const FullPostPage = ({user}) => {
    // states for inf scroll
    const [hasMore, setHasMore] = useState(true);
    const [fetchPage, setFetchPage] = useState(1);

    const [postData, setPostData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [acceptedComment, setAcceptedComment] = useState([])
    const [fetchedFiles, setFetchedFiles] = useState([]);

    const navigate = useNavigate();
    const userData = useAuthStore((state) => state.userData);
    const { postId } = useParams();

    const fetchFileData = async () => {
        let fetchedData = [];

        try {
            const response = await fetch(`http://localhost:3000/file/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    files_metadata: postData.files_metadata
                })
            })
            if (response.ok) {
                fetchedData = await response.json();
            }
        } catch (err) {
            console.error(err)
        }

        const fetchedFilesWithContent = fetchedFiles.map(file => {
            const fileData = fetchedData.find(data => data._id === file.id);
            return {
                ...file,
                content: fileData.data /* pre-read text data */
            };
        });

        setFetchedFiles(fetchedFilesWithContent);

    }

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
                    const data = await response.json();
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
        console.log(newComments)
    }

    useEffect(() => {
        getPostData();
    }, [])

    useEffect(() => {
        if (postData && postData.files_metadata) {
            setFetchedFiles(postData?.files_metadata.map(file => {
                const parsedFileMetadata = JSON.parse(file.metadata);
                return {
                    id: file._id,
                    ...parsedFileMetadata
                };
            }));
        }
    }, [postData]);


    const getTimeSincePost = (createdAt) => {
        const now = new Date();
        const creationTime = new Date(createdAt);
        return (now.getTime() - creationTime.getTime()) / 1000;
    }

    const handleCreateCommentClick = () => {
        if (!userData) {
            toast.error("You have to log in first!");
        } else {
            navigate("./comment", {state: {postData: postData}});
        }
    };

    return (
        <>
            <div className="fullpost-window" id="fullpost-window">
                <div className="fullpost-container">
                    {postData ? (<FullPost
                        _id={postId || null}
                        isComment={false} 
                        author={postData.author.name || null} 
                        authorId={postData.author._id || null}
                        postTitle={postData.title || null}
                        timeSincePost={displayTime(getTimeSincePost(postData.createdAt))}
                        voteCount={postData.votes} 
                        postTags={null} /* placeholder */
                        postContent={postData.content || null}
                        codeContent={postData.code || null}
                        files={fetchedFiles.length && fetchedFiles}
                        fetchFileContent={fetchFileData}
                        user={user}
                    />
                ) : ("")}
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
                                    _id={acceptedComment._id || null}
                                    voteCount={acceptedComment.votes || "N/A"}
                                    author={acceptedComment?.author?.name || "N/A"} 
                                    postTitle={acceptedComment.title || "N/A"}
                                    timeSincePost={displayTime(getTimeSincePost(acceptedComment.createdAt))}
                                    postTags={null} // placeholder 
                                    postContent={acceptedComment.content || null}
                                    codeContent={acceptedComment.code || null}
                                    user={user}
                                />
                            ) : ("")}
                            
                            {commentData.length ? (
                                commentData.map((comment) => {
                                    return (
                                        <FullPost isComment={true} isAccepted={false}
                                            _id={comment._id || null}
                                            voteCount={comment.votes}
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
    );
}

export default FullPostPage;