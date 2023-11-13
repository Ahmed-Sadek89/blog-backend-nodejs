import { Request, Response } from "express"
import Categories from "../models/categories.model"
import { category_input } from "../dtos/category.dto"


const category = new Categories()
export const addNewCategory = async (req: Request, res: Response) => {
    let { cat_name } = req.body as category_input
    await category.addNewCategory({cat_name})
    .then((cat_name) => {
        res.status(200).json({
            status: 200,
            result: `category ${cat_name} inserted successfully`
        })
    })
    .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error
        })
    })
}

export const getAllCategories = async (req: Request, res: Response) => {
    await category.getAllCategories()
    .then((result) => {
        res.status(200).json({
            status: 200,
            result
        })
    })
    .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error
        })
    })
}

export const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params
    await category.getCategoryById({id})
    .then((result) => {
        res.status(200).json({
            status: 200,
            result
        })
    })
    .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error
        })
    })
}


export const deleteCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params
    await category.deleteCategoryById({id})
    .then((result) => {
        res.status(200).json({
            status: 200,
            result
        })
    })
    .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error
        })
    })
}

export const updateCategoryById = async (req: Request, res: Response) => {
    const { cat_name } = req.body as category_input
    const { id } = req.params
    await category.updateCategoryById({ cat_name }, {id})
    .then((result) => {
        res.status(200).json({
            status: 200,
            result
        })
    })
    .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error
        })
    })
}