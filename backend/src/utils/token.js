import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const signToken = (userInfo) => {
    const token = jsonwebtoken.sign(userInfo, process.env.secret_key, {expiresIn: '1h'})
    return token
}

export const refreshToken = (userInfo) => {
    const token = jsonwebtoken.sign(userInfo, process.env.secret_key, {expiresIn: '24h'})
    return token
}

export const verifyToken = (token) => {
    const decoded = jsonwebtoken.verify(token, process.env.secret_key)
    return decoded
}