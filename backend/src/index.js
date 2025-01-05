import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { get_forum_posts } from "./controllers/post.controller.js";

import authRoute from "./routes/auth.route.js"
import postRoute from "./routes/post.route.js"
import userRoute from "./routes/user.route.js"


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
app.use('/post', postRoute)
app.use('/user', userRoute)

app.get('/forum', get_forum_posts)
