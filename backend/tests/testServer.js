import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import loginRoute from "./login.route.js"
import post from "../models/post.model.js";

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.listen(PORT, () => {
    connectDB();
    console.log(`Listening at PORT ${PORT}`)
})

app.use('/login', loginRoute)

app.post('/upload', async (req, res) => {
    const newPost = new post(req.body)
    try {
        await newPost.save();
        res.status(200).send("OK")
    } catch (error) {
        console.error(error.message)
    }
    
})