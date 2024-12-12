import express from "express";
import bcryptjs from "bcryptjs";

import { authenticateUser, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/signup', signup
)

router.get('/login', async (req, res) => {
    const { name, password } = req.body
    
    const user = await authenticateUser(name, password)
    if (user) {
        res.status(200).json(user.name)
    }
})
export default router