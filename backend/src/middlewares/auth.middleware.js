import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

import user from "../models/user.model.js"; 

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
        res.locals.user = usr
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}