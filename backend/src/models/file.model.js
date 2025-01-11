import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parent_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
}, {timestamps: true}
)

const file = mongoose.model('file', fileSchema)
export default file;