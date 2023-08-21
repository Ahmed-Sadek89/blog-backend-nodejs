import jwt from 'jsonwebtoken';
import * as dotEnv from 'dotenv';

dotEnv.config()
export const createToken = (payload: { email: string }) => {
    const secretKey= process.env.JWT_SECRET_KEY || ''
    return jwt.sign(payload, secretKey, {
        expiresIn: '1d',
    })
}