import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parent_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    vote_type: {
        type: String,
        enum: ['upvote', 'downvote']
    }
})

const vote = mongoose.model('Vote', voteSchema)
export default vote;