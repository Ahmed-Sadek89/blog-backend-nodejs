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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPostInfo_1 = require("../assets/PostAssets/getPostInfo");
const getPosts_1 = require("../assets/PostAssets/getPosts");
const postCommand_1 = require("../assets/PostAssets/postCommand");
const validate_1 = require("../assets/validation/validate");
const database_1 = __importDefault(require("../config/database"));
const model_1 = __importDefault(require("./model"));
const dotEnv = __importStar(require("dotenv"));
dotEnv.config();
class Posts extends model_1.default {
    constructor() {
        super("posts");
        Posts.command = (0, postCommand_1.getPostCommand)();
    }
    addNewPost(post) {
        const emptyProperties = (0, validate_1.validate)(post);
        return new Promise((resolve, reject) => {
            if (emptyProperties.length > 0) {
                reject(`proprety ${emptyProperties} is requried`);
            }
            this.insert(Object.assign({}, post))
                .then(() => {
                resolve(`new post inserted successfully`);
            })
                .catch(() => {
                reject(`new post did not insert!`);
            });
        });
    }
    updatePostById(body, params) {
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.readByParams({ id })
                .then((res) => {
                return res;
            })
                .then((res) => {
                this.update(Object.assign(Object.assign({}, body), { post_image: res.post_image || body.post_image }), { id })
                    .then(() => {
                    resolve(`post number ${id} updated successfully`);
                })
                    .catch(() => {
                    reject(`post number ${id} did not update!`);
                });
            })
                .catch((e) => {
                reject(`post number ${id} is not found!`);
            });
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
            database_1.default.query(`${Posts.command} where posts.id=${id}`, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (data.length > 0) {
                        resolve((0, getPostInfo_1.getPostInfo)(data));
                    }
                }
            });
        });
    }
    getLatestPosts() {
        return new Promise((resolve, reject) => {
            database_1.default.query(`${Posts.command} order by posts.created_at desc`, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (data.length > 0) {
                        resolve((0, getPosts_1.getPosts)(data));
                    }
                    else {
                        resolve([]);
                    }
                }
            });
        });
    }
    getLatestPostByCategory(params) {
        let { categoryId } = params;
        return new Promise((resolve, reject) => {
            database_1.default.query(`${Posts.command} where posts.category_id=${categoryId} order by posts.created_at desc`, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (data.length > 0) {
                        resolve((0, getPosts_1.getPosts)(data));
                    }
                    else {
                        resolve([]);
                    }
                }
            });
        });
    }
}
exports.default = Posts;
