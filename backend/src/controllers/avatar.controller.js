import Avatar from '../models/Avatar.js';

export const uploadAvatar = async (req, res) => {
  const { userId } = req.body;
  const avatarFile = req.file;

  try {
    let avatar = await Avatar.findOne({ userId });

    if (avatar) {
      avatar.imageUrl = avatarFile.path;
    } else {
      avatar = new Avatar({
        userId: userId,
        imageUrl: avatarFile ? avatarFile.path : '/uploads/avatars/default.png',
      });
    }

    await avatar.save();
    res.json({ avatar });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).send('Server error');
  }
};