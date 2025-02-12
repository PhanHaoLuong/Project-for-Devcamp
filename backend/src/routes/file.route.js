import express from 'express';
import fs from 'fs';
import multer from 'multer';

import { protected_route } from '../middlewares/auth.middleware.js';
import fileDB from '../models/file.model.js';

const router = express.Router();

const upload = multer({ dest: 'file_upload/' })
const unlinkAsync = fs.promises.unlink

router.post('/',  upload.any(), protected_route, async (req, res) => {
    try {
        //To return an array of metadatas
        let files_id = req.files.map(async (file, i) => {
            const fileContent = fs.readFileSync(file.path);

            const metadata = req.body.metadata[i];
            const newFile = await new fileDB({ data: fileContent, metadata: metadata }).save();

            return { _id: newFile._id, metadata: metadata };
        });
        
        //To delete the files after saving them to the database
        await Promise.all(req.files.map(file => unlinkAsync(file.path)));

        files_id = await Promise.all(files_id);

        res.status(200).json(files_id);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

export default router