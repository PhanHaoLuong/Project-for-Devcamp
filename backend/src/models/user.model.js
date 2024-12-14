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
    }]
    //We'll need to add fields for: Email, real_name, saved_posts
})

const user = mongoose.model('User', userSchema)
export default user;