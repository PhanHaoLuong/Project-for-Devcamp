import express from "express";
import bcryptjs from "bcryptjs";

import { login, logout, protected_route, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/token.js";
import { get } from "mongoose";

const router = express.Router();

router.post('/signup', signup)

//test route
router.get('/verify', protected_route, async (req, res) => {
    try {
        res.status(200).json(res.locals.user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/login', login)
router.post('/test', protected_route, async (req, res) => {res.status(200).json({message: `${res.locals.user.name}`})})
router.post('/logout', logout) //to be implemented
export default router

