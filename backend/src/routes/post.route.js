import express from 'express';

import post from "../models/post.model.js";
import user from '../models/user.model.js';
import Comment from '../models/comment.model.js';

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

//to get a single post, WIP
router.get('/:postid', async (req, res) => {
    try {
        const postid = req.params.postid
        const singlepost = await post.findById(postid)
        .populate('author', 'name')
        .populate({path:'comments', populate:{path:'author', select:'name'},select:'content code'})
    
        res.status(200).json(singlepost);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//to comment on a post, WIP
router.post('/:postid/comment', async (req, res) => {
    const postid = req.params.postid
    const newComment = new Comment(Object.assign(req.body, {parent_post: postid}))
    try {
        await post.updateOne({_id: postid}, {$push: {comments: newComment._id}})
        await newComment.save();
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//to delete a comment, WIP
router.delete('/:postid/deletecomment', async (req, res) => {
    const postid = req.params.postid
    const commentid = req.body.commentid
    try {
        await post.updateOne({_id: postid}, {$pull: {comments: commentid}}) 
        await Comment.deleteOne({_id: commentid})
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error.message)
    }
})
export default router