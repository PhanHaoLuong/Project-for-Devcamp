import express from 'express';

import { searchPosts, searchUsers } from '../controllers/search.controller.js';

const router = express.Router();
    
// Search posts by title
router.get('/posts', searchPosts);

// Search users by name
router.get('/users', searchUsers);

export default router;