import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const post = mongoose.model('Post', postSchema)
export default post;