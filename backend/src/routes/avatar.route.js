import express from 'express';
import multer from 'multer';
import { Avatar } from '../models/Avatar';
import { User } from '../models/User';
import path from 'path';

const router = express.Router();

// Set up Multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/avatars/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Get avatar by user ID
router.get('/:userId', async (req, res) => {
  try {
    const avatar = await Avatar.findOne({ user: req.params.userId });
    if (!avatar) {
      return res.status(404).json({ error: 'Avatar not found' });
    }
    res.status(200).json({ avatar });
  } catch (error) {
    console.error('Error fetching avatar:', error);
    res.status(500).json({ error: 'Failed to fetch avatar' });
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed.'));
    }
  },
});

// Upload or update avatar
router.post('/upload', upload.single('avatar'), async (req, res) => {
  try {
    const { userId } = req.body;
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    // Update or create the avatar in the database
    const updatedAvatar = await Avatar.findOneAndUpdate(
      { user: userId },
      { imageUrl: avatarUrl, isDefault: false },
      { upsert: true, new: true }
    );

    // Update user model to include avatar
    await User.findByIdAndUpdate(userId, { avatar: avatarUrl });

    res.status(200).json({ message: 'Avatar uploaded successfully.', avatar: updatedAvatar });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ error: 'Failed to upload avatar.' });
  }
});

// Serve uploaded images
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export default router;
