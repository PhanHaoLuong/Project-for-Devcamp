import express from "express";
import bcryptjs from "bcryptjs";

import { login, logout, protected_route, signup } from "../controllers/auth.controller.js";
import jsonwebtoken from "jsonwebtoken";
import user from "../models/user.model.js";

const router = express.Router();

router.post('/signup', signup)

router.get('/verify', async (req, res) => {
    try {
        const token = req.cookies.accessToken
        if (!token) {
            return res.status(401).json({message:'Unauthorized'})
        }
        
        const decoded = jsonwebtoken.verify(token, process.env.secret_key)
        if (!decoded) {
            return res.status(401).json({message:'Unauthorized'})
        }
        const usr = await user.findOne({_id: decoded.userInfo}).select('-password')
        res.status(200).json(usr)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/login', login)
router.post('/logout', logout)
export default router
