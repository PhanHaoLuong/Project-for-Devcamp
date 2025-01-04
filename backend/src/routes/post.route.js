import express from 'express';

import post from "../models/post.model.js";
import user from '../models/user.model.js';

const router = express.Router();

//to upload a post, WIP
router.post('/upload', async (req, res) => {
    const author = req.body.author
    const newPost = new post(req.body)
    try {
        await user.updateOne({_id: author}, {$push: {posts: newPost._id}})
        await newPost.save();
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//to delete a post, WIP
router.delete('/delete/:postid', async (req, res) => {
    const postid = req.params.postid
    const author = req.body.author
    try {
        await user.updateOne({_id: author}, {$pull: {posts: postid}})
        await post.deleteOne({_id: postid})
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

export default router