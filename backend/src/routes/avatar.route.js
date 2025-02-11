import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadAvatar } from '../controllers/avatar.controller.js';
import Avatar from '../models/avatar.model.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../backend/src/uploads/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|bmp)$/)) {
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
    res.status(200).json({ avatarName: avatar.imageName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;