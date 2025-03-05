import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { get_forum_posts } from "./controllers/post.controller.js";

import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import avatarRoute from "./routes/avatar.route.js"; 
import searchRoute from "./routes/search.route.js";
import fileRoute from "./routes/file.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({ 
      origin: "http://localhost:5173", 
      credentials: true 
    })
  );
}


app.use(express.json());
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
app.use('/uploads', express.static('./backend/src/uploads'));
app.use('/file', fileRoute)
app.post('/forum', get_forum_posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}


