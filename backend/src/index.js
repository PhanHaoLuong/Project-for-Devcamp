import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { get_forum_posts } from "./controllers/post.controller.js";

import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import avatarRoute from "./routes/avatar.route.js"; 
import searchRoute from "./routes/search.route.js";
import fileRoute from "./routes/file.route.js"

import file from "./models/file.model.js"
import code from "./models/code.model.js"

dotenv.config();
const PORT = process.env.PORT || 3000; 

const corsoptions = { origin: "http://localhost:5173", credentials: true };

const app = express();

app.use(express.json());
app.use(cors(corsoptions));
app.use(cookieParser());

const server = app.listen(PORT, () => {
  connectDB();
  console.log(`Listening at PORT ${PORT}`);
});

server.timeout = 300000;

app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/avatar', avatarRoute);
app.use('/search', searchRoute);
app.use('/uploads', express.static('src/uploads'));
app.use('/file', fileRoute)

app.get('/forum', get_forum_posts);

app.post('/code', async (req, res) => {
    const {author, language, data} = req.body
    const newCode = new code({author, language, data})
    await newCode.save()
    res.status(200).send('Code saved successfully')
})

