import { Request, Response } from 'express';
import User from "../models/users.model";
import { createToken } from "../config/createToken";
import { user_input, user_login } from '../dtos/users.dto';

const user = new User();

export const getAllUsers = async (_req: Request, res: Response) => {
    await user.getAllUsers()
        .then((result: any) => {
            res.status(200).json({
                status: 200,
                count: result.length,
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
export const getuserById = async (req: Request, res: Response) => {
    const { id } = req.params
    await user.getUserByParam({ id })
        .then((result: any) => {
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
    let { username, email, password } = req.body as user_input;
    let user_image = req.file?.filename 
    await user.register({ username, email, password, image: user_image })
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

export const login = async (req: Request, res: Response) => {
    let { email, password } = req.body as user_login;
    await user.login({ email, password })
        .then((result: any) => {
            const token = createToken({ ...result });
            return token
        })
        .then((result) => {
            res.status(200).json({
                status: 200,
                message: "token success",
                token: result
            })
        })
        .catch(e => {
            res.status(400).json({
                status: 404,
                result: e
            })
        })
}

export const updateUserById = async (req: Request, res: Response) => {
    const image = req.file?.filename
    const { id } = req.params;
    await user.updateUser({ ...req.body , image }, { id })
        .then((result) => {
            res.status(200).json({
                status: 200,
                result
            })
        })
        .catch((error) => {
            res.status(400).json({
                status: 404,
                result: error
            })
        })
}

export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await user.deleteUser({ id })
        .then((result) => {
            res.status(200).json({
                status: 200,
                result
            })
        })
        .catch((error) => {
            res.status(400).json({
                status: 404,
                result: error
            })
        })
}