import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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