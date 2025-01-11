import express from 'express';

import { create_comment, create_post, delete_comment, delete_post, get_post, get_post_comments, accept_comment } from '../controllers/post.controller.js';
import { downvote, upvote } from '../controllers/vote.controller.js';
import { protected_route } from '../controllers/auth.controller.js';

const router = express.Router();

//to upload a post, WIP
router.post('/create', protected_route, create_post)

//to delete a post, WIP
router.delete('/delete/:postid', delete_post)

//to get a single post and then it's comments, WIP
router.get('/:postid', get_post, get_post_comments)

router.post('/:postid/accept_comment', accept_comment)

router.post('/:postid/upvote', protected_route, upvote)
router.post('/:postid/downvote', protected_route, downvote)

//to comment on a post, WIP
router.post('/:postid/comment', protected_route, create_comment)

//to delete a comment, WIP
router.delete('/:postid/deletecomment', delete_comment)


export default router