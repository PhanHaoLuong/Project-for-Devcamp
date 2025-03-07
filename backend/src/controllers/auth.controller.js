import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import user from "../models/user.model.js"; 

dotenv.config();

export const protected_route = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jsonwebtoken.verify(token, process.env.secret_key);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const usr = await user.findById(decoded.userInfo).select('-password');
        res.locals.user = usr;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate and set token
const generateAndSetToken = (res, userId) => {
    const token = jsonwebtoken.sign({ userInfo: userId }, process.env.secret_key, { expiresIn: '1h' });
    res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    });
    return token;
};

// Signup controller
export const signup = async (req, res) => {
    const { name, pw, email } = req.body;

    try {
        if (!name || !pw || name.length < 4 || pw.length < 8) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const isRealEmail = await verifyEmailExistence(email);
        if (!isRealEmail) {
            return res.status(400).json({ message: "Invalid or non-existent email." });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }

        const salt = await bcryptjs.genSalt(12); 
        const hashedPass = await bcryptjs.hash(pw, salt);

        const newUser = new user({ name, password: hashedPass, email });
        await newUser.save();

        generateAndSetToken(res, newUser._id);

        res.status(201).json({ message: "User created successfully", user: newUser.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyEmailExistence = async (email) => {
    try {
        console.log(email);
        console.log(process.env.ABSTRACT_API_KEY);
        const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`);
        if (!response.ok) {
            throw new Error("Failed to verify email.");
        }

        const data = await response.json();
        return data.is_valid_format.value && data.deliverability === "DELIVERABLE";
    } catch (error) {
        console.error("Email verification failed:", error.message);
        return false;
    }
};

// Login controller
export const login = async (req, res) => {
    const { name, pw } = req.body;
    try {
        const existingUser = await user.findOne({ name });
        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const isPasswordValid = await bcryptjs.compare(pw, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        generateAndSetToken(res, existingUser._id);

        res.status(200).json({ message: 'User logged in successfully', user: existingUser.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout controller
export const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'User logged out successfully' });
};

// Verify controller
export const verify = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jsonwebtoken.verify(token, process.env.secret_key);
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

        const usr = await user.findById(decoded.userInfo).select('-password');
        if (!usr) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(usr);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};