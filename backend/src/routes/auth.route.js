import express from "express";
import bcryptjs from "bcryptjs";

import { login, logout, protected_route, signup } from "../controllers/auth.controller.js";
import jsonwebtoken from "jsonwebtoken";
import { verifyToken } from "../utils/token.js";

const router = express.Router();

router.post('/signup', signup)

//test route
router.get('/verify', async (req, res) => {
    try {
        const token = req.cookies.accessToken
        if (!token) {
            res.status(401).json({message: "Unauthorized"})
        } else {
            const verified = jsonwebtoken.verify(token, process.env.secret_key)
            if (!verified) {
                res.status(401).json({message: "Unauthorized"})
            } else{
                res.status(200).json({message: "Authorized"})
            }
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/login', login)
router.post('/test', protected_route, async (req, res) => {res.status(200).json({message: `${res.locals.user.name}`})})
router.post('/logout', logout) //to be implemented
export default router

