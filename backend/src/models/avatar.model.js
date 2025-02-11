import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageName: {
        type: String, 
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    currentAvatar: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

avatarSchema.index({ userId: 1 });

const Avatar = mongoose.model('Avatar', avatarSchema);

export default Avatar;