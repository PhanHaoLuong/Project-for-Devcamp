// import modules
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import displayNum from "../utils/displayNum";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

// import assets
import VoteIcon from '../assets/vote.svg';
import DownvoteIcon from '../assets/downvote.svg';
import UpvoteIcon from '../assets/upvote.svg'

// import styles
import '../styles/Vote.css'

const Vote = ({ voteCount, _id }) => {
    const [isUpvote, setUpvote] = useState(false);
    const [isDownvote, setDownvote] = useState(false);
    const [currVoteCount, updateVoteCount] = useState(voteCount);

    const {data: authUser} = useQuery({ queryKey: ["authUser"]});
    const user = useAuthStore((state) => state.userData);

    const getVote = async () => {
        try {
            const response = await fetch(`http://localhost:3000/post/${_id}/voted`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",},
                credentials: "include",
            })
            const responseJson = await response.json();
            updateVoteCount(voteCount);
            if (responseJson === "upvote") {
                setUpvote(true);
                
            }
            else if (responseJson === "downvote") {
                setDownvote(true);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };
    useEffect(() => {
        if (authUser) {
            getVote();
        }
    }, []);

    // useEffect(() => {
    //     if (isUpvote && isDownvote) { 
    //         setDownvote(false); 
    //     }

    //     if (voteCount || voteCount === 0) {
    //         if (isUpvote) {
    //             updateVoteCount(voteCount + 1);
    //         } else if (isDownvote) {
    //             updateVoteCount(voteCount - 1);
    //         } else {
    //             updateVoteCount(voteCount)
    //         }
    //     }
    // }, [isUpvote]);
      
    // useEffect(() => {
    //     updateVoteCount(voteCount);
    //     if (isUpvote && isDownvote) { 
    //         setUpvote(false); 
    //     }

    //     if (voteCount || voteCount === 0) {
    //         if (isUpvote) {
    //             updateVoteCount(voteCount + 1);
    //         } else if (isDownvote) {
    //             updateVoteCount(voteCount - 1);
    //         } else {
    //             updateVoteCount(voteCount);
    //         }
    //     }
    // }, [isDownvote]);


    const handleVote = async (voteMethod) => {
        const res = await fetch(`http://localhost:3000/post/${_id}/${voteMethod}`, {
            method: "POST",
            credentials: "include",
        })
    };

    //Needs optimization
    const handleUpvote = async () => {
        handleVote("upvote");
        if (isDownvote) {
            setUpvote(true);
            setDownvote(false);
            updateVoteCount(currVoteCount + 2);
        }
        else if (isUpvote) {
            setUpvote(false);
            updateVoteCount(currVoteCount - 1);
        }
        else {
            setUpvote(true);
            updateVoteCount(currVoteCount + 1);
        }
    }

    const handleDownvote = async () => {
        handleVote("downvote");
        if (isUpvote) {
            setDownvote(true);
            setUpvote(false);
            updateVoteCount(currVoteCount - 2);
        }
        else if (isDownvote) {
            setDownvote(false);
            updateVoteCount(currVoteCount + 1);
        }
        else {
            setDownvote(true);
            updateVoteCount(currVoteCount - 1);
        }
    }


    return (
        <>
            <div className="vote">
                <img className="vote-button" id="upvote" 
                    src={isUpvote ? UpvoteIcon : VoteIcon} 
                    onClick={() => user ? handleUpvote() : toast.error("You have to log in first!")}
                ></img>
                <span className="vote-count">{displayNum(currVoteCount)}</span>
                <img className="vote-button" id="downvote" 
                    src={isDownvote ? DownvoteIcon : VoteIcon}
                    onClick={() => user ? handleDownvote() : toast.error("You have to log in first!")}
                ></img>
            </div>
        </>
    );
};

export default Vote;