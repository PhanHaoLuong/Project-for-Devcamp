// import modules
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import displayTime from "../utils/displayTime";

//import components
import FullPost from "../components/FullPost";
import AddIcon from "../assets/add.svg";

// import styles
import '../styles/FullPostPage.css'

const FullPostPage = () => {
    const [postData, setPostData] = useState(null);
    const [commentData, setCommentData] = useState(null);
    const [fetchedFiles, setFetchedFiles] = useState([]);

    const navigate = useNavigate();
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

    useEffect(() => {
 
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/post/${postId}`, {
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
            const data = await fetchPost();
            
            setPostData(data.post);
            if (data.accepted_comment || data.comments) {
                setCommentData({
                    acceptedComments: data.accepted_comment,
                    comments: data.comments
                });
            }
        }

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

    useEffect(() => {
        console.log(fetchedFiles)
    }, [fetchedFiles])
    

    const getTimeSincePost = (createdAt) => {
        const now = new Date();
        const creationTime = new Date(createdAt);
        return (now.getTime() - creationTime.getTime()) / 1000;
    }
    return (
        <>
            <div className="post-container">
                {postData && fetchedFiles ? (
                    <FullPost isComment={false} 
                        author={postData.author.name || null} 
                        postTitle={postData.title || null}
                        timeSincePost={displayTime(getTimeSincePost(postData.createdAt))}
                        voteCount={postData.votes} 
                        postTags={null} /* placeholder */
                        postContent={postData.content || null}
                        codeContent={postData.code || null}
                        files={fetchedFiles.length && fetchedFiles}
                        fetchFileContent={fetchFileData}
                    />
                ) : ("")}
                {commentData && commentData.acceptedComments ? (
                    commentData.acceptedComments.map((comment) => {
                        return (
                            <FullPost isComment={true} isAccepted={true}
                                author={comment.author.name || "N/A"} 
                                postTitle={comment.title || "N/A"}
                                timeSincePost={displayTime(getTimeSincePost(comment.createdAt))}
                                postTags={null} // placeholder 
                                postContent={comment.content || null}
                                codeContent={comment.code || null}
                            />
                        )
                    })
                ) : ("")} 
                {commentData && commentData.comments ? (
                        commentData.comments.map((comment) => {
                            return (
                                <FullPost isComment={true} isAccepted={false}
                                    author={comment.author.name || "N/A"} 
                                    postTitle={comment.title || "N/A"}
                                    timeSincePost={displayTime(getTimeSincePost(comment.createdAt))}
                                    postTags={null} // placeholder 
                                    postContent={comment.content || null}
                                    codeContent={comment.code || null}
                                />
                            )
                        })
                ) : ("")} 
                    
                
            </div>
            <button className="comment-button"
                onClick={() => {navigate("./comment", {state: {postData: postData}})}}
            >
                <span className="comment-logo">
                    <img src={AddIcon}></img>
                </span>
                <span className="comment-button-title">comment</span>
            </button>
        </>
    )
}

export default FullPostPage;