import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";

import user from './models/user.model.js';

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.listen(PORT, () => {
    connectDB();
    console.log(`Listening at PORT ${PORT}`)
})

app.get('/', async (req, res) =>{
    const newUser = new user(req.body)
    try {
        
        await newUser.save()
        res.status(200).send('Success')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/:username', async (req, res) => {
    const { username } = req.params
    const { name } = req.body


    try {
        const usr = await user.findOne({name: username})
        usr.followers.push(`${name}`)
        await usr.save();
        console.log(usr.followers)
    } catch (error) {
        console.log(error.message)
    }
})