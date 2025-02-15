import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    data: {
        type: Buffer,
        required: true
    },
    metadata: {
        type: Object,
        required: true
    }
}, {timestamps: true}
)

const fileDB = mongoose.model('file', fileSchema)
export default fileDB;