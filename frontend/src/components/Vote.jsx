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

    useEffect(() => {
        if (isUpvote && isDownvote) { 
          setDownvote(false); 
        }
    }, [isUpvote]);
      
      useEffect(() => {
        if (isUpvote && isDownvote) { 
          setUpvote(false); 
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
                <span className="vote-count">{displayNum(voteCount) || "0"}</span>
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