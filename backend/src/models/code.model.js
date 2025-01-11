import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    language: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
})

const code = mongoose.model('Code', codeSchema)
export default code;