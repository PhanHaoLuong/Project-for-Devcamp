import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { connectDB } from "./config/db.js";

import authRoute from "./routes/auth.route.js"
import post from "./models/post.model.js";

dotenv.config();
const PORT = process.env.PORT;

const corsoptions = { origin: "http://localhost:5173" }


const app = express()
app.use(express.json())
app.use(cors(corsoptions))

app.listen(PORT, () => {
    connectDB(); 
    console.log(`Listening at PORT ${PORT}`)
})

app.use('/auth', authRoute)

app.post('/upload', async (req, res) => {
    const newPost = new post(req.body)
    try {
        await newPost.save();
        res.status(200).send("OK")
    } catch (error) {
        console.error(error.message)
    }
    
})