import express from "express";
import bcryptjs from "bcryptjs";

import { login, logout, protected_route, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/token.js";

const router = express.Router();

router.post('/signup', signup)

//test route
router.get('/verify', async (req, res) => {
    req.headers['Authorization'] = "Bearer " + "abc"
    res.status(200).send(req.headers.Authorization)
})

router.post('/login', login)
router.post('/test', protected_route, async (req, res) => {res.status(200).json({message: `${res.locals.user.name}`})})
router.post('/logout', logout) //to be implemented
export default router

