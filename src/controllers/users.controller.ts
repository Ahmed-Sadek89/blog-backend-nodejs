import { users } from "../dtos/users.dto"
import { Request, Response } from 'express';
import User from "../models/user.model";
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
    const token = createToken({ email, password });
    await user.login({ email, password })
        .then((result) => {
            res.status(200).json({
                status: 200,
                result,
                token
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
    const body = req.body;
    const { id } = req.params;
    await user.updateUser(body, { id })
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