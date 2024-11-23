import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    password:String,
    followers:Array
})

const user = mongoose.model('User', userSchema)
export default user;