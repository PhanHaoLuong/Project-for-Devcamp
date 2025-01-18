import vote from "../models/vote.model.js";

import { add_vote } from "../utils/vote_queue.js";


//Caching to be implemented
export const upvote = async (req, res) => {
    const postid = req.params.postid
    const author = res.locals.user._id

    try {
        const existingVote = await vote.findOne({ parent_post_id: postid, author: author })

        if (existingVote) {
            if (existingVote.vote_type === 'upvote') {
                await vote.deleteOne({ parent_post_id: postid, author: author })
                add_vote(postid, author, -1)
                res.status(200).send("Upvote removed")
            } else {
                await vote.updateOne({ parent_post_id: postid, author: author }, { vote_type: 'upvote' })
                add_vote(postid, author, 2)
                res.status(200).send("Upvoted")
            }
        } else {
            const newVote = new vote({ parent_post_id: postid, author: author, vote_type: 'upvote' })
            await newVote.save();
            add_vote(postid, author, 1)
            res.status(200).send("Upvoted")
        } 
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const downvote = async (req, res) => {
    const postid = req.params.postid
    const author = res.locals.user._id

    try {
        const existingVote = await vote.findOne({ parent_post_id: postid, author: author })

        if (existingVote) {
            if (existingVote.vote_type === 'downvote') {
                await vote.deleteOne({ parent_post_id: postid, author: author })
                add_vote(postid, author, 1)
                res.status(200).send("Downvote removed")
            } else {
                await vote.updateOne({ parent_post_id: postid, author: author }, { vote_type: 'downvote' })
                add_vote(postid, author, -2)
                res.status(200).send("Downvoted")
            }
        } else {
            const newVote = new vote({ parent_post_id: postid, author: author, vote_type: 'downvote' })
            await newVote.save();
            add_vote(postid, author, -1)
            res.status(200).send("Downvoted")
        } 
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const voted = async (req, res) => {
    const postid = req.params.postid
    const author = res.locals.user._id

    if (!author) {
        res.status(200).json("none")
    }
    try {
        const existingVote = await vote.findOne({ parent_post_id: postid, author: author })

        if (existingVote) {
            res.status(200).json(existingVote.vote_type)
        } else {
            res.status(200).json("none")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}