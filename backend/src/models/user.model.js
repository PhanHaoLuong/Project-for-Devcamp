import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    email: String,
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
}, {timestamps: true})

const user = mongoose.model('User', userSchema)
export default user;