"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getImageLink_1 = require("../assets/ModelsAssets/getImageLink");
const validate_1 = require("../assets/validation/validate");
const database_1 = __importDefault(require("../config/database"));
const model_1 = __importDefault(require("./model"));
const dotEnv = __importStar(require("dotenv"));
dotEnv.config();
class Posts extends model_1.default {
    constructor() {
        super("posts");
    }
    addNewPost(post) {
        const { title, description, post_image, category_id, user_id } = post;
        const emptyProperties = (0, validate_1.validate)(post);
        return new Promise((resolve, reject) => {
            if (emptyProperties.length > 0) {
                reject(`proprety ${emptyProperties} is requried`);
            }
            this.insert({ title, description, post_image, category_id, user_id })
                .then(() => {
                resolve(`new post inserted successfully`);
            })
                .catch((error) => {
                reject(`new post did not insert!`);
            });
        });
    }
    updatePostById(body, params) {
        const { title, description, post_image, category_id } = body;
        const { id } = params;
        const emptyProperties = (0, validate_1.validate)(body);
        return new Promise((resolve, reject) => {
            if (emptyProperties.length > 0) {
                reject(`proprety ${emptyProperties} is requried`);
            }
            else {
                this.update({ title, description, post_image, category_id }, { id })
                    .then(() => {
                    resolve(`post number ${id} updated successfully`);
                })
                    .catch(() => {
                    reject(`post number ${id} did not update!`);
                });
            }
        });
    }
    deletePostById(params) {
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.delete({ id })
                .then(() => {
                resolve(`post number ${id} deleted successfully`);
            })
                .catch(() => {
                reject(`post number ${id} did not delete!`);
            });
        });
    }
    getPostByPostId(params) {
        const { id } = params;
        return new Promise((resolve, reject) => {
            database_1.default.query(`select 
                    posts.id, posts.title, posts.description, posts.post_image, posts.created_at as published_at, posts.updated_at as last_modified_at,
                    categories.id as cat_id, categories.cat_name, 
                    users.username, users.email, users.image 
                from posts
                inner join categories on posts.category_id=categories.id
                inner join users on posts.user_id=users.id
                where posts.id=${id}`, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (data.length > 0) {
                        let modifiedData = [];
                        data.map((index) => {
                            let { cat_id, cat_name, username, email, image } = index, others = __rest(index, ["cat_id", "cat_name", "username", "email", "image"]);
                            let post_image = (0, getImageLink_1.getImageLink)(index.post_image);
                            let user_image = (0, getImageLink_1.getImageLink)(image);
                            modifiedData.push(Object.assign(Object.assign({}, others), { post_image, category: {
                                    cat_id,
                                    cat_name,
                                }, user: {
                                    username,
                                    email,
                                    image: user_image,
                                } }));
                        });
                        resolve(modifiedData[0]);
                    }
                    else {
                        reject([]);
                    }
                }
            });
        });
    }
    getLatestPosts() {
        return new Promise((resolve, reject) => {
            database_1.default.query(`select 
                    posts.id, posts.title, posts.description, posts.post_image, posts.created_at as published_at, posts.updated_at as last_modified_at,
                    categories.id as cat_id, categories.cat_name, 
                    users.username, users.email, users.image 
                from posts
                inner join categories on posts.category_id=categories.id
                inner join users on posts.user_id=users.id
                order by posts.updated_at desc`, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (data.length > 0) {
                        let modifiedData = [];
                        data.map((index) => {
                            let { cat_id, cat_name, username, email, image } = index, others = __rest(index, ["cat_id", "cat_name", "username", "email", "image"]);
                            const post_image = (0, getImageLink_1.getImageLink)(index.post_image);
                            const user_image = (0, getImageLink_1.getImageLink)(image);
                            modifiedData.push(Object.assign(Object.assign({}, others), { post_image, category: {
                                    cat_id,
                                    cat_name,
                                }, user: {
                                    username,
                                    email,
                                    image: user_image,
                                } }));
                        });
                        resolve(modifiedData);
                    }
                    else {
                        reject([]);
                    }
                }
            });
        });
    }
    getLatestPostByCategory(params) {
        let { categoryId } = params;
        return new Promise((resolve, reject) => {
            database_1.default.query(`select 
                    posts.id, posts.title, posts.description, posts.post_image, posts.created_at as published_at, posts.updated_at as last_modified_at,
                    categories.id as cat_id, categories.cat_name, 
                    users.username, users.email, users.image 
                from posts
                inner join categories on posts.category_id=categories.id
                inner join users on posts.user_id=users.id
                where posts.category_id=${categoryId} order by posts.updated_at desc`, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (data.length > 0) {
                        let modifiedData = [];
                        data.map((index) => {
                            let { cat_id, cat_name, username, email, image } = index, others = __rest(index, ["cat_id", "cat_name", "username", "email", "image"]);
                            const post_image = (0, getImageLink_1.getImageLink)(index.post_image);
                            const user_image = (0, getImageLink_1.getImageLink)(image);
                            modifiedData.push(Object.assign(Object.assign({}, others), { post_image, category: {
                                    cat_id,
                                    cat_name,
                                }, user: {
                                    username,
                                    email,
                                    image: user_image,
                                } }));
                        });
                        resolve(modifiedData);
                    }
                    else {
                        reject([]);
                    }
                }
            });
        });
    }
}
exports.default = Posts;
