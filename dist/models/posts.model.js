"use strict";
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
const database_1 = __importDefault(require("../config/database"));
const model_1 = __importDefault(require("./model"));
class Posts extends model_1.default {
    constructor() {
        super('posts');
    }
    validation(body) {
        let emptyProperties = [];
        body = Object.entries(body);
        if (body !== null) {
            body.forEach((index) => {
                if (index[1] === '' ||
                    Number.isNaN(index[1]) ||
                    index[1] === 0 ||
                    index[1] === undefined ||
                    index[1] === false) {
                    emptyProperties.push(`${index[0]}`);
                }
            });
        }
        return emptyProperties.toString();
    }
    addNewPost(post) {
        const { title, description, image, category_id, user_id } = post;
        const emptyProperties = this.validation(post);
        return new Promise((resolve, reject) => {
            if (emptyProperties.length > 0) {
                reject(`proprety ${emptyProperties} is requried`);
            }
            else {
                this.insert({ title, description, image, category_id, user_id })
                    .then(() => {
                    resolve(`new post inserted successfully`);
                })
                    .catch(() => {
                    reject(`new post did not insert!`);
                });
            }
        });
    }
    updatePostById(body, params) {
        const { title, description, image, category_id } = body;
        const { id } = params;
        const emptyProperties = this.validation(body);
        return new Promise((resolve, reject) => {
            if (emptyProperties.length > 0) {
                reject(`proprety ${emptyProperties} is requried`);
            }
            else {
                this.update({ title, description, image, category_id }, { id })
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
        // return new Promise((resolve, reject) => {
        //     this.readByParams({ id })
        //         .then((result) => {
        //             resolve(result)
        //         })
        //         .catch((error) => {
        //             reject(error)
        //         })
        // })
        return new Promise((resolve, reject) => {
            database_1.default.query(`select 
                    posts.id, posts.title, posts.description, posts.post_image, 
                    categories.cat_name, 
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
                            let { username, email, image } = index, others = __rest(index, ["username", "email", "image"]);
                            modifiedData.push(Object.assign(Object.assign({}, others), { user: { username, email, image } }));
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
                    posts.id, posts.title, posts.description, posts.post_image, 
                    categories.cat_name, 
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
                            let { username, email, image } = index, others = __rest(index, ["username", "email", "image"]);
                            modifiedData.push(Object.assign(Object.assign({}, others), { user: { username, email, image } }));
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
                    posts.id, posts.title, posts.description, posts.post_image, 
                    categories.cat_name, 
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
                            let { username, email, image } = index, others = __rest(index, ["username", "email", "image"]);
                            modifiedData.push(Object.assign(Object.assign({}, others), { user: { username, email, image } }));
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
