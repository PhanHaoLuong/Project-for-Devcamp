import express from 'express';
import fs from 'fs';
import multer from 'multer';

import { protected_route } from '../middlewares/auth.middleware.js';

import { upload_files, get_files } from '../controllers/file.controller.js';


const router = express.Router();

const upload = multer({ dest: 'file_upload/' })

router.post('/',  upload.any(), protected_route, upload_files)

router.post('/:postid', get_files)

export default router