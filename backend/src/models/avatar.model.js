import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String, 
        required: true
    }
}, { timestamps: true });

const avatar = mongoose.model('Avatar', avatarSchema);
export default avatar;
