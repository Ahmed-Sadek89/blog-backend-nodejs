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
exports.getPostByPostId = exports.getLatestPostByCategory = exports.getLatestPosts = exports.deletePostById = exports.updatePostById = exports.addNewPost = void 0;
const posts_model_1 = __importDefault(require("../models/posts.model"));
const post = new posts_model_1.default();
const addNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let post_image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    yield post
        .addNewPost(Object.assign(Object.assign({}, req.body), { post_image }))
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
});
exports.addNewPost = addNewPost;
const updatePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let post_image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
    let { id } = req.params;
    yield post
        .updatePostById(Object.assign(Object.assign({}, req.body), { post_image }), { id })
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
});
exports.updatePostById = updatePostById;
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    yield post
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
});
exports.deletePostById = deletePostById;
const getLatestPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield post
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
});
exports.getLatestPosts = getLatestPosts;
const getLatestPostByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    yield post
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
});
exports.getLatestPostByCategory = getLatestPostByCategory;
const getPostByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield post
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
});
exports.getPostByPostId = getPostByPostId;
