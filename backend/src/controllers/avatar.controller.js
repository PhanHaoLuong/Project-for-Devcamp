import Avatar from '../models/avatar.model.js';
import cloudinary from '../../../frontend/src/lib/cloudinary.js';
import streamifier from 'streamifier';

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
    
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(avatarFile.buffer).pipe(stream);
      });
    }

    const result = await streamUpload();

    const newAvatar = new Avatar({
      userId: userId,
      imageName: avatarFile.originalname,
      mimeType: avatarFile.mimetype,
      size: avatarFile.size,
      currentAvatar: true,
      url: result.secure_url,
    });
    

    await newAvatar.save();
    res.status(201).json({ url: newAvatar.url });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).send('Server error');
  }
};