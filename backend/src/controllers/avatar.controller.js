import Avatar from '../models/avatar.model.js';

export const uploadAvatar = async (req, res) => {
  const { userId } = req.body;
  const avatarFile = req.file;

  if (!avatarFile) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    let avatar = await Avatar.findOne({ userId });

    if (avatar) {
      // If user already has an avatar, set currentAvatar to false
      avatar.currentAvatar = false;
      await avatar.save();
    }

    // Create new avatar
    avatar = new Avatar({
      userId: userId,
      imageName: avatarFile ? `${avatarFile.filename}` : 'default.png',
      mimeType: avatarFile.mimetype,
      size: avatarFile.size,
    });
    

    await avatar.save();
    res.json({ avatar: avatar.imageName });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).send('Server error');
  }
};
