import { users } from "../dtos/users.dto"
import { Request, Response } from 'express';
import User from "../models/users.model";
import { createToken } from "../config/createToken";

const user = new User();

export const getAllUsers = async (req: Request, res: Response) => {
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
            const {password, ...others} = result
            res.status(200).json({
                status: 200,
                result: others
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
    let { username, email, password } = req.body as users;
    let image = req.file?.filename 
    await user.register({ username, email, password, image })
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
    let { email, password } = req.body as users;
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
    const { username, email, password } = req.body;
    const image = req.file?.path
    const { id } = req.params;
    await user.updateUser({ username, email, password, image }, { id })
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