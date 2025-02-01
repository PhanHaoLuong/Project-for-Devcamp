import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    email: {
        type: String,
        unique: true,
        required: true
    },
    realname: String,
    bio: String,
    reputation: {
        type: Number,
        default: 0
    },
    visits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
}, {timestamps: true})

const user = mongoose.model('User', userSchema)
export default user;