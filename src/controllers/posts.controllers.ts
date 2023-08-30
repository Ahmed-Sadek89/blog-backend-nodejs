import { Request, Response } from "express";
import Posts from "../models/posts.model";
import { posts } from "../dtos/posts.dto";

const post = new Posts();

export const addNewPost = async (req: Request, res: Response) => {
    const { title, description, category_id, user_id } = req.body as posts
    let post_image = req.file?.path
    await post.addNewPost({ title, description, post_image: post_image, category_id, user_id })
        .then(result => {
            res.status(200).json({
                status: 200,
                result
            })
        })
        .catch(error => {
            res.status(400).json({
                status: 400,
                result: error
            })
        })
}

export const updatePostById = async (req: Request, res: Response) => {
    const { title, description, category_id } = req.body as posts
    let post_image = req.file?.path
    let { id } = req.params
    await post.updatePostById({ title, description, post_image, category_id }, { id })
        .then(result => {
            res.status(200).json({
                status: 200,
                result
            })
        })
        .catch(error => {
            res.status(400).json({
                status: 400,
                result: error
            })
        })
}


export const deletePostById = async (req: Request, res: Response) => {
    let { id } = req.params
    await post.deletePostById({ id })
        .then(result => {
            res.status(200).json({
                status: 200,
                result
            })
        })
        .catch(error => {
            res.status(400).json({
                status: 400,
                result: error
            })
        })
}


export const getLatestPosts = async (req: Request, res: Response) => {
    await post.getLatestPosts()
        .then(result => {
            res.status(200).json({
                status: 200,
                result
            })
        })
        .catch(error => {
            res.status(404).json({
                status: 404,
                result: error
            })
        })
}

export const getLatestPostByCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params
    await post.getLatestPostByCategory({ categoryId })
        .then(result => {
            res.status(200).json({
                status: 200,
                result
            })
        })
        .catch(error => {
            res.status(404).json({
                status: 404,
                result: error
            })
        })
}

export const getPostByPostId = async (req: Request, res: Response) => {
    const { id } = req.params
    await post.getPostByPostId({ id })
        .then(result => {
            res.status(200).json({
                status: 200,
                result
            })
        })
        .catch(error => {
            res.status(404).json({
                status: 404,
                result: error
            })
        })
}