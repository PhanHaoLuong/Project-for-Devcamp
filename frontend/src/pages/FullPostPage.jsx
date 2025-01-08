// import modules
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import displayTimeWithUnit from "../utils/displayTime";

//import components
import FullPost from "../components/FullPost";

// import styles
import '../styles/FullPostPage.css'
import displayTime from "../utils/displayTime";

const FullPostPage = () => {
    const [postData, setPostData] = useState(null);
    const [commentData, setCommentData] = useState(null);

    const { postId } = useParams();
    const url = `/post/${postId}`;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    if (response.status === 404) {
                        console.log('post not found')
                    }
                    return null;
                } else {
                    return await response.json();
                }
            } catch (error) {
                console.log('cannot fetch posts. error: ', error);
                return null;
            }
        }

        const getPostData = async () => {
            const data = await fetchPost()
            setPostData(data.post);
            setCommentData({
                acceptedComments: data.accepted_comment,
                comments: data.comments
            });
        }

        getPostData();

    }, [postId])

    const getTimeSincePost = (createdAt) => {
        const now = new Date();
        const creationTime = new Date(createdAt);
        return (now.getTime() - creationTime.getTime()) / 1000;
    }

    return (
        <div className="post-container">
            <FullPost isComment={false} 
                author={postData.author || null} 
                postTitle={postData.title || null}
                timeSincePost={displayTime(getTimeSincePost(postData.createdAt))}
                voteCount={postData.votes || null} 
                postTags={null} /* placeholder */
                postContent={postData.content || null}
                codeContent={postData.code || null}
                folderContent={null} /* placeholder */
            />
            {commentData ? (
                [
                    commentData.acceptedComments.map((comment) => {
                        return (
                            <FullPost isComment={true} isAccepted={true}
                                author={comment.author || "N/A"} 
                                postTitle={comment.title || "N/A"}
                                timeSincePost={displayTime(getTimeSincePost(comment.createdAt))}
                                voteCount={comment.votes || "N/A"} 
                                postTags={null} /* placeholder */
                                postContent={comment.content || null}
                                codeContent={comment.code || null}
                                folderContent={null} /* placeholder */
                            />
                        )
                    }),
                    commentData.comments.map((comment) => {
                        return (
                            <FullPost isComment={true} isAccepted={false}
                                author={comment.author || "N/A"} 
                                postTitle={comment.title || "N/A"}
                                timeSincePost={displayTime(getTimeSincePost(comment.createdAt))}
                                voteCount={comment.votes || "N/A"} 
                                postTags={null} /* placeholder */
                                postContent={comment.content || null}
                                codeContent={comment.code || null}
                                folderContent={null} /* placeholder */
                            />
                        )
                    })
                ]
                
                
            ) : ("")} 
        </div>
    )
}

export default FullPostPage;