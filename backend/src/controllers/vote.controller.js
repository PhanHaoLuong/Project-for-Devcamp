import vote from "../models/vote.model.js";

import { add_vote } from "../utils/vote_queue.js";

export const upvote = async (req, res) => {
    const postid = req.params.postid
    const author = req.body.author

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