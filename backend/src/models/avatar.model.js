import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String, 
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    isCurrent: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

avatarSchema.index({ userId: 1 });

const Avatar = mongoose.model('Avatar', avatarSchema);

export default Avatar;