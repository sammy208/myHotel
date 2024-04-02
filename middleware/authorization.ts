import {Request, Response, NextFunction} from 'express';
import jwt from'jsonwebtoken';
import dotenv from'dotenv';
import {findUserByEmail}from'../service/userService.ts';
import { any } from 'joi';

dotenv.config();

// Middleware to verify cookies for user
export const checkAdminAccess = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET) ;
const user = await findUserByEmail(decoded.email)

        // console.log(isUserAuthorized);
        if (!user){
            return res.status(401).json({
                message: "Go and login"
            })
        } 
        if (user.role!== 'admin') {
            return res.status(401).json({
                message: "You are not authorized to access this resource"
            });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({
message: "Token has expired"
            });
        }

        next();
    } catch (error) {
        console.error("Error verifying user token:", error);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}
