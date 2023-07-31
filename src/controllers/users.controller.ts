import { users } from "../dtos/users.dto"
import { Request, Response } from 'express';
import User from "../models/user.model";

const user = new User();

export const getAllUsers = async (req: Request, res: Response) => {
    await user.getAllUsers()
    .then(result => {
        res.status(200).json({
            status: 200,
            result
        })
    })
    .catch(e => {
        res.status(404).json({
            status: 404,
            result: e
        })
    })
}

export const rejester = async (req: Request, res: Response) => {
    let { username, email, password, image } = req.body as users;
    await user.register({ username, email, password, image })
        .then(() => {
            res.status(200).json({
                status: 200,
                result: `user ${username} inserted successfully`
            })
        })
        .catch(e => {
            res.status(400).json({
                status: 404,
                result: e
            })
        })
}

export const login = async (req: Request, res: Response) => {
    let { email, password } = req.body as users;
    await user.login({ email, password })
        .then((result) => {
            res.status(200).json({
                status: 200,
                result
            })
        })
        .catch(e => {
            res.status(400).json({
                status: 404,
                result: e
            })
        })
}

