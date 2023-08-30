"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryById = exports.deleteCategoryById = exports.getCategoryById = exports.getAllCategories = exports.addNewCategory = void 0;
const categories_model_1 = __importDefault(require("../models/categories.model"));
const category = new categories_model_1.default();
const addNewCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { cat_name } = req.body;
    yield category.addNewCategory({ cat_name })
        .then(() => {
        res.status(200).json({
            status: 200,
            result: `category ${cat_name} inserted successfully`
        });
    })
        .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error || `category ${cat_name} did not insert!`
        });
    });
});
exports.addNewCategory = addNewCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield category.getAllCategories()
        .then((result) => {
        res.status(200).json({
            status: 200,
            result
        });
    })
        .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error
        });
    });
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield category.getCategoryById({ id })
        .then((result) => {
        res.status(200).json({
            status: 200,
            result
        });
    })
        .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error
        });
    });
});
exports.getCategoryById = getCategoryById;
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield category.deleteCategoryById({ id })
        .then((result) => {
        res.status(200).json({
            status: 200,
            result
        });
    })
        .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error
        });
    });
});
exports.deleteCategoryById = deleteCategoryById;
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat_name } = req.body;
    const { id } = req.params;
    yield category.updateCategoryById({ cat_name }, { id })
        .then((result) => {
        res.status(200).json({
            status: 200,
            result
        });
    })
        .catch((error) => {
        res.status(400).json({
            status: 400,
            result: error
        });
    });
});
exports.updateCategoryById = updateCategoryById;
