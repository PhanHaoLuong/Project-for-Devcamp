import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import user from "../models/user.model.js"; 
import { signToken } from "../utils/token.js";

dotenv.config()

export const protected_route = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken
        if (!token) {
            return res.status(401).json({message:'Unauthorized'})
        }

        const decoded = jsonwebtoken.verify(token, process.env.secret_key)
        if (!decoded) {
            return res.status(401).json({message:'Unauthorized'})
        }

        const usr = await user.findById(decoded.userInfo).select('-password')
        console.log(usr)
        res.locals.user = usr
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const signup = async (req, res) => {
    const { name, pw } = req.body
    try{

        if ( !name || !pw || name.length < 4 || pw.length < 8 ) {
            return res.status(400).json({message:'Input error'});
        }

        const usr = await user.findOne({name})

        if (usr) {
            return res.status(409).json({message:'User already exists'})
        }

        const hashedPass = await bcryptjs.hash(pw, 10)
        const newUser = new user({
        name,
        password:hashedPass})

        if(newUser){
            signToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({message:'User created successfully', user:newUser.name})
        }
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
    // const refreshToken = jsonwebtoken.sign({name}, process.env.refresh_secret_key, {expiresIn: '7d'})
    // try {
    //     await newUser.save()
    //     res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: 3600000, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})
    //     res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 3600000*24*7, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})
    //     res.status(201).send('Success')
    // } catch (error) {
    //     res.status(500).send(error.message)
    // }
}

export const login = async (req, res) => {
    const { name, pw } = req.body
    try{
        const userExist = await user.findOne({name})

        if (!userExist) {
            return res.status(404).json({message:'User does not exist'})
        } else {
            const validPass = bcryptjs.compare(pw, userExist.password)
            if (!validPass) {
                return res.status(400).json({message:'Incorrect password'})
            }
            signToken(userExist._id, res)
            res.status(200).json({message:'User logged in successfully', user:userExist.name})
        }
    }
    catch(error){
        res.status(500).json({message:error.message})
    }   
}

export const logout = async (req, res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(200).json({message:'User logged out successfully'})
}