// import modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import displayNum from "../utils/displayNum";

// import assets
import VoteIcon from '../assets/vote.svg';
import DownvoteIcon from '../assets/downvote.svg';
import UpvoteIcon from '../assets/upvote.svg'

// import styles
import '../styles/Vote.css'

const Vote = ({ voteCount }) => {
    const [isUpvote, setUpvote] = useState(false);
    const [isDownvote, setDownvote] = useState(false);
    const [currVoteCount, updateVoteCount] = useState(voteCount);

    useEffect(() => {
        if (isUpvote && isDownvote) { 
            setDownvote(false); 
        }

        if (voteCount) {
            if (isUpvote) {
                updateVoteCount(voteCount + 1);
            } else if (isDownvote) {
                updateVoteCount(voteCount - 1);
            } else {
                updateVoteCount(voteCount)
            }
        }
    }, [isUpvote]);
      
      useEffect(() => {
        updateVoteCount(voteCount);
        if (isUpvote && isDownvote) { 
            setUpvote(false); 
        }

        if (voteCount) {
            if (isUpvote) {
                updateVoteCount(voteCount + 1);
            } else if (isDownvote) {
                updateVoteCount(voteCount - 1);
            } else {
                updateVoteCount(voteCount)
            }
        }
    }, [isDownvote]);

    const handleVote = () => {
        console.log(`voted`)
    }

    return (
        <>
            <div className="vote">
                <img className="vote-button" id="upvote" 
                    src={isUpvote ? UpvoteIcon : VoteIcon} 
                    onClick={() => {
                        setUpvote(!isUpvote);
                        handleVote();
                    }}
                ></img>
                <span className="vote-count">{displayNum(currVoteCount) || "0"}</span>
                <img className="vote-button" id="downvote" 
                    src={isDownvote ? DownvoteIcon : VoteIcon}
                    onClick={() => {
                        setDownvote(!isDownvote);
                        handleVote();
                    }}
                ></img>
            </div>
        </>
    );
};

export default Vote;