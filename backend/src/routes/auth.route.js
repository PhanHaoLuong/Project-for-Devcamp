import express from "express";
import bcryptjs from "bcryptjs";

import { login, logout, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/token.js";

const router = express.Router();

router.post('/signup', signup)

//test route
router.get('/verify', async (req, res) => {
    req.headers['Authorization'] = "Bearer " + "abc"
    res.status(200).send(req.headers.Authorization)
})

router.post('/login', login)
router.post('/logout', logout) //to be implemented
export default router

