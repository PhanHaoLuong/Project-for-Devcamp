import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const signToken = async (userInfo) => {
    const token = await jsonwebtoken.sign(userInfo, process.env.secret_key)
    return token
}