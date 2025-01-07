import express from 'express';

import post from "../models/post.model.js";
import user from '../models/user.model.js';
import Comment from '../models/comment.model.js';
import { create_comment, create_post, delete_comment, delete_post, get_post, get_forum_posts, get_post_comments, accept_comment } from '../controllers/post.controller.js';
import { downvote, upvote } from '../controllers/vote.controller.js';

const router = express.Router();

//to upload a post, WIP
router.post('/upload', create_post)

//to delete a post, WIP
router.delete('/delete/:postid', delete_post)

//to get a single post and then it's comments, WIP
router.get('/:postid', get_post, get_post_comments)

router.post('/:postid/accept_comment', accept_comment)

router.post('/:postid/upvote', upvote)
router.post('/:postid/downvote', downvote)

//to comment on a post, WIP
router.post('/:postid/comment', create_comment)

//to delete a comment, WIP
router.delete('/:postid/deletecomment', delete_comment)


export default router