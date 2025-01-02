import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const signToken = (userInfo, res) => { //Use to create a token with expiration time of 1 hour
    const token = jsonwebtoken.sign({userInfo}, process.env.secret_key, {expiresIn: "1h"})

    res.cookie('accessToken', token, {httpOnly: true, maxAge: 3600000, sameSite: 'strict', secure: process.env.NODE_ENV !== 'development'})
    return token
}


//Needs to find a way to properly implement the refresh token
export const refreshToken = (userInfo) => { //Use to refresh the token
    const token = jsonwebtoken.sign(userInfo, process.env.refresh_secret_key)
    return token
}

export const verifyToken = (token) => {
    const decoded = jsonwebtoken.verify(token, process.env.secret_key)
    return decoded
}