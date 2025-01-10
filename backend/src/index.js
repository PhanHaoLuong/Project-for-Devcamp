import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser"

import { connectDB } from "./config/db.js";
import { get_forum_posts } from "./controllers/post.controller.js";

import authRoute from "./routes/auth.route.js"
import postRoute from "./routes/post.route.js"
import userRoute from "./routes/user.route.js"

import file from "./models/file.model.js"



dotenv.config();
const PORT = process.env.PORT;

const corsoptions = { origin: "http://localhost:5173", credentials: true }

const app = express()

app.use(express.json())
app.use(cors(corsoptions))
app.use(cookieParser())

app.listen(PORT, () => {
    connectDB(); 
    console.log(`Listening at PORT ${PORT}`)
})

app.use('/auth', authRoute)
app.use('/post', postRoute)
app.use('/user', userRoute)

app.get('/forum', get_forum_posts)

app.post('/fileupload', fileUpload({createParentPath: true}),async (req, res) => {
    const files = req.files
    console.log(files.file.data)
    const save = {'author': '6778ad96d751b1b21cfb06cc', 'data': files.file.data}
    
    const newFile = new file(save)
    await newFile.save()

    res.status(200).json({message: 'file uploaded successfully'})
})
