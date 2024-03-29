import { Request, Response } from "express";
import Posts from "../models/posts.model";

const post = new Posts();

export const addNewPost = async (req: Request, res: Response) => {
  let post_image = req.file?.filename;
  await post
    .addNewPost({...req.body, post_image})
    .then((result) => {
      res.status(200).json({
        status: 200,
        result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 400,
        result: error,
      });
    });
};

export const updatePostById = async (req: Request, res: Response) => {
  let post_image = req.file?.filename;
  let { id } = req.params;
  await post
    .updatePostById({ ...req.body, post_image }, { id })
    .then((result) => {
      res.status(200).json({
        status: 200,
        result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 400,
        result: error,
      });
    });
};

export const deletePostById = async (req: Request, res: Response) => {
  let { id } = req.params;
  await post
    .deletePostById({ id })
    .then((result) => {
      res.status(200).json({
        status: 200,
        result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 400,
        result: error,
      });
    });
};

export const getLatestPosts = async (req: Request, res: Response) => {
  await post
    .getLatestPosts()
    .then((result) => {
      res.status(200).json({
        status: 200,
        result,
      });
    })
    .catch((error) => {
      res.status(404).json({
        status: 404,
        result: error,
      });
    });
};

export const getLatestPostByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  await post
    .getLatestPostByCategory({ categoryId })
    .then((result) => {
      res.status(200).json({
        status: 200,
        result,
      });
    })
    .catch((error) => {
      res.status(404).json({
        status: 404,
        result: error,
      });
    });
};

export const getPostByPostId = async (req: Request, res: Response) => {
  const { id } = req.params;
  await post
    .getPostByPostId({ id })
    .then((result) => {
      res.status(200).json({
        status: 200,
        result,
      });
    })
    .catch((error) => {
      res.status(404).json({
        status: 404,
        result: error,
      });
    });
};
