import dotenv from "dotenv";
import bcryptjs from "bcryptjs";

import user from "../models/user.model.js"; 
import { signToken } from "../utils/token.js";

dotenv.config()

export const signup = async (req, res) => {
    const { name, password } = req.body
    const hashedPass = await bcryptjs.hash(password, 10)
    const newUser = new user({
        name,
        password:hashedPass
    })
    const token = signToken({name})
    console.log(token)
    try {
        await newUser.save()
        res.cookie('accessToken', token, {httpOnly: true, maxAge: 3600000, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})
        res.status(201).send('Success')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const authenticateUser = async (name, password) => {
    const userExist = await user.findOne({name})

    if (!userExist) {
        res.status(404).send('User not found')
    } else {
        const validPass = bcryptjs.compare(password, userExist.password)
        if (!validPass) {
            res.status(400).send('Invalid password')
            return null;
        } else {
            return userExist;
        }
    }
}