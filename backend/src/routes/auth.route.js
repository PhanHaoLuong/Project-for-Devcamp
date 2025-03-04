import express from "express";
import bcryptjs from "bcryptjs";

import { login, logout, protected_route, signup, verify } from "../controllers/auth.controller.js";
import jsonwebtoken from "jsonwebtoken";
import user from "../models/user.model.js";

const router = express.Router();

router.post('/signup', signup)

router.post('/verify', verify)

router.post('/login', login)

router.post('/logout', logout)
export default router
