import express from 'express';

import { create_comment, create_post, delete_comment, delete_post, get_post, get_post_comments, accept_comment, savePost, unsavePost } from '../controllers/post.controller.js';
import { downvote, upvote } from '../controllers/vote.controller.js';
import { protected_route } from '../controllers/auth.controller.js';

const router = express.Router();

//to upload a post, WIP
router.post('/create', protected_route, create_post)

//WIP
router.delete('/delete/:postid', delete_post)

router.get('/:postid', get_post, get_post_comments)

//WIP
router.post('/:postid/accept_comment', accept_comment)

router.post('/:postid/upvote', protected_route, upvote)
router.post('/:postid/downvote', protected_route, downvote)

router.post('/:postid/comment', protected_route, create_comment)

//WIP
router.delete('/:postid/deletecomment', delete_comment)


// Save and unsave post
router.post('/:postId/save', savePost)
router.post('/:postId/unsave', unsavePost)

export default router