import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parent_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    accepted: {
        type: Boolean,
        default: false,
        required: true
    },
    votes: {
        type: Number,
        default: 0,
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const comment = mongoose.model('Comment', commentSchema);
export default comment;