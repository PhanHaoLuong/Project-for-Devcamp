import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Code',
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        createdAt: {type: Date, default: Date.now}
    }],
    votes: {
        type: Number,
        default: 0
    },
    // file handling, tags will be implemented in the future
}, {timestamps: true}
)

const post = mongoose.model('Post', postSchema)
export default post;