import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotEnv from 'dotenv';

dotEnv.config()
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization
    const secretKey = process.env.JWT_SECRET_KEY || ""
    if (!token) {
        return res.status(401).json({
            status: 404,
            result: "No token provided."
        });
    } else {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                res.status(404).json({
                    status: 404,
                    result: "you are unauthorized !",
                })
            } else {
                // console.log({ tokenRes: decoded })
                next()
            }
        })
    }
}


