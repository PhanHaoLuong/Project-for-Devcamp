import express from "express";
import bcryptjs from "bcryptjs";

import user from "../models/user.model.js";
import { signToken } from "../utils/signToken.js";

const router = express.Router();

router.get('/signup', async (req, res) => {
    const { name, password } = req.body
    const hashedPass = await bcryptjs.hash(password, 10)
    const newUser = new user({
        name,
        password:hashedPass
    })
    console.log(await signToken(name))
    try {
        await newUser.save()
        res.status(200).send('Success')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

export default router