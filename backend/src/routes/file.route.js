import express from 'express';
import multer from 'multer';

import { protected_route } from '../middlewares/auth.middleware.js';

import { upload_files, get_files } from '../controllers/file.controller.js';


const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 10000000 },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(cpp|cs|py|js|jsx|ts|tsx|java|go|rs|swift|txt)$/)) {
          return cb(new Error('File not supported'));
        }
        cb(undefined, true);
    }
})

router.post('/',  upload.any(), protected_route, upload_files)

router.post('/:postid', get_files)

export default router