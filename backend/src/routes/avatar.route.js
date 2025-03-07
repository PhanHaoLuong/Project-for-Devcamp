import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadAvatar } from '../controllers/avatar.controller.js';
import Avatar from '../models/avatar.model.js';

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
      return cb(new Error('File not supported'));
    }
    cb(undefined, true);
  }
});

router.post('/upload', upload.single('avatar'), uploadAvatar);

router.get('/:userid', async (req, res) => {
  try {
    const userid = req.params.userid;
    const avatar = await Avatar.findOne({ userId: userid, currentAvatar: true });
    
    if (!avatar) {
      return res.status(404).json({ message: 'Avatar not found' });
    }
    res.status(200).json({ url: avatar.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;