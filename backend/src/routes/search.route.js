import express from 'express';

import { search } from '../controllers/search.controller.js';

const router = express.Router();

// Search posts by title
router.get('/search', search)