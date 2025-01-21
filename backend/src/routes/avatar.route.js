import express from 'express';
import path from 'path';
import Avatar from '../models/avatar.model.js';

const router = express.Router();

router.get('/:userId/avatar', async (req, res) => {
  try {
    const avatar = await Avatar.findOne({ userId: req.params.userId });
    if (!avatar) {
      return res.status(404).json({ error: 'Avatar not found' });
    }
    res.status(200).json({ avatarUrl: avatar.imageUrl });
  } catch (error) {
    console.error('Error fetching avatar:', error);
    res.status(500).json({ error: 'Failed to fetch avatar' });
  }
});

export default router;