import Avatar from '../models/avatar.model.js';

export const uploadAvatar = async (req, res) => {
  const { userId } = req.body;
  const avatarFile = req.file;

  if (!avatarFile) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Find the current avatar for the user and set its currentAvatar field to false
    let currentAvatar = await Avatar.findOne({ userId, currentAvatar: true });
    if (currentAvatar) {
      currentAvatar.currentAvatar = false;
      await currentAvatar.save();
    }

    // Create new avatar
    const newAvatar = new Avatar({
      userId: userId,
      imageName: avatarFile.filename,
      mimeType: avatarFile.mimetype,
      size: avatarFile.size,
      currentAvatar: true
    });

    await newAvatar.save();
    res.json({ avatar: newAvatar.imageName });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).send('Server error');
  }
};