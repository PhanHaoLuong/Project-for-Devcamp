import e from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password:String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    email: String,
    //We'll need to add fields for: Email, real_name, saved_posts
}, {timestamps: true})

const user = mongoose.model('User', userSchema)
export default user;