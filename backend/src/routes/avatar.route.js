const express = require('express');
const multer = require('multer');
const { Avatar } = require('../models/Avatar');
const { User } = require('../models/User');
const path = require('path');

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

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb('Error: Only images are allowed.');
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
    console.error(error);
    res.status(500).json({ error: 'Failed to upload avatar.' });
  }
});

// Serve uploaded images
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = router;
