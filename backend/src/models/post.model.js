import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parent_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
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
    accepted_comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    is_comment: {
        type: Boolean,
        default: false
    },
    votes: {
        type: Number,
        default: 0
    },
    files_metadata: {
        type: [{ _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File'},
            metadata: String,
        }],
    },
    tags: {
        type: [{
            type: String,
            enum : ['projects', 'dsa', 'software engineering', 'digital systems', 'computer architecture', 'computer networks', 'python', 'java', 'c++', 'javascript', 'c#', 'rust', 'go', 'c', 'matlab', 'carbon', 'elixir', 'typescript', 'ruby', 'php', 'swift', 'scala']
        }],
        default: []
    },
}, {timestamps: true}
)

const post = mongoose.model('Post', postSchema)
export default post;