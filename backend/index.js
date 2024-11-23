import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

import { connectDB } from "./config/db.js";

import user from './models/user.model.js';
import { signToken } from "./utils/signToken.js";

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.listen(PORT, () => {
    connectDB();
    console.log(`Listening at PORT ${PORT}`)
})

app.get('/', async (req, res) =>{
    const { name, password } = req.body
    const hashedPass = await bcryptjs.hash(password, 10)
    const newUser = new user({
        name,
        password:hashedPass
    })
    console.log(await signToken(req.body))
    try {
        await newUser.save()
        res.status(200).send('Success')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// app.use('/login', loginRoute)