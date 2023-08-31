import connection from "../config/database";
import { posts } from "../dtos/posts.dto";
import Model from "./model";
import * as dotEnv from 'dotenv';
dotEnv.config();

class Posts extends Model {

    constructor() {
        super('posts')
    }

    private validation(body: { [key: string]: any }) {
        let emptyProperties: string[] = []
        body = Object.entries(body)
        if (body !== null) {
            body.forEach((index: any) => {
                if (
                    index[1] === '' ||
                    Number.isNaN(index[1]) ||
                    index[1] === 0 ||
                    index[1] === undefined ||
                    index[1] === false
                ) {
                    emptyProperties.push(`${index[0]}`)
                }
            })
        }
        return emptyProperties.toString()
    }

    private getImageLink(image: string): string {
        let splitImage = image.split('\\');
        let imageLink = `${process.env.BACK_END_IMAGE_LINK}/${splitImage[2]}/${splitImage[3]}`;
        return imageLink
    }

    public addNewPost(post: posts) {
        const { title, description, post_image, category_id, user_id } = post;
        const emptyProperties = this.validation(post);
        return new Promise((resolve, reject) => {
            if (emptyProperties.length > 0) {
                reject(`proprety ${emptyProperties} is requried`)
            } else {
                this.insert({ title, description, post_image, category_id, user_id })
                    .then(() => {
                        resolve(`new post inserted successfully`)
                    })
                    .catch((error) => {
                        reject(`new post did not insert!`)
                    })
            }
        })
    }

    public updatePostById(body: posts, params: { [x: string]: string | number }) {
        const { title, description, post_image, category_id } = body;
        const { id } = params;
        const emptyProperties = this.validation(body);
        return new Promise((resolve, reject) => {
            if (emptyProperties.length > 0) {
                reject(`proprety ${emptyProperties} is requried`)
            } else {
                this.update({ title, description, post_image, category_id }, { id })
                    .then(() => {
                        resolve(`post number ${id} updated successfully`)
                    })
                    .catch(() => {
                        reject(`post number ${id} did not update!`)
                    })
            }
        })
    }

    public deletePostById(params: { [x: string]: string | number }) {
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.delete({ id })
                .then(() => {
                    resolve(`post number ${id} deleted successfully`)
                })
                .catch(() => {
                    reject(`post number ${id} did not delete!`)
                })
        })
    }

    public getPostByPostId(params: { [x: string]: string | number }) {
        const { id } = params;

        return new Promise((resolve, reject) => {
            connection.query(
                `select 
                    posts.id, posts.title, posts.description, posts.post_image, posts.created_at as published_at, posts.updated_at as last_modified_at,
                    categories.id as cat_id, categories.cat_name, 
                    users.username, users.email, users.image 
                from posts
                inner join categories on posts.category_id=categories.id
                inner join users on posts.user_id=users.id
                where posts.id=${id}`, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    if (data.length > 0) {
                        let modifiedData: posts[] = []
                        data.map((index: any) => {
                            let { cat_id, cat_name, username, email, image, ...others } = index;
                            let post_image = this.getImageLink(index.post_image);
                            let user_image = this.getImageLink(image);
                            modifiedData.push({
                                ...others,
                                post_image,
                                category: {
                                    cat_id,
                                    cat_name
                                },
                                user: {
                                    username,
                                    email,
                                    image: user_image
                                }
                            })
                        })
                        resolve(modifiedData[0])
                    } else {
                        reject([])
                    }
                }
            })
        })
    }

    public getLatestPosts() {
        return new Promise((resolve, reject) => {
            connection.query(
                `select 
                    posts.id, posts.title, posts.description, posts.post_image, posts.created_at as published_at, posts.updated_at as last_modified_at,
                    categories.id as cat_id, categories.cat_name, 
                    users.username, users.email, users.image 
                from posts
                inner join categories on posts.category_id=categories.id
                inner join users on posts.user_id=users.id
                order by posts.updated_at desc`, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    if (data.length > 0) {
                        let modifiedData: posts[] = []
                        data.map((index: any) => {
                            let { cat_id, cat_name, username, email, image, ...others } = index;
                            const post_image = this.getImageLink(index.post_image);
                            const user_image = this.getImageLink(image);
                            modifiedData.push({
                                ...others,
                                post_image,
                                category: {
                                    cat_id,
                                    cat_name
                                },
                                user: {
                                    username,
                                    email,
                                    image: user_image
                                }
                            })
                        })
                        resolve(modifiedData)
                    } else {
                        reject([])
                    }
                }
            })
        })
    }


    public getLatestPostByCategory(params: { [x: string]: string | number | undefined }) {
        let { categoryId } = params
        return new Promise((resolve, reject) => {
            connection.query(
                `select 
                    posts.id, posts.title, posts.description, posts.post_image, posts.created_at as published_at, posts.updated_at as last_modified_at,
                    categories.id as cat_id, categories.cat_name, 
                    users.username, users.email, users.image 
                from posts
                inner join categories on posts.category_id=categories.id
                inner join users on posts.user_id=users.id
                where posts.category_id=${categoryId} order by posts.updated_at desc`, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    if (data.length > 0) {
                        let modifiedData: posts[] = []
                        data.map((index: any) => {
                            let { cat_id, cat_name, username, email, image, ...others } = index;
                            const post_image = this.getImageLink(index.post_image);
                            const user_image = this.getImageLink(image);
                            modifiedData.push({
                                ...others,
                                post_image,
                                category: {
                                    cat_id,
                                    cat_name
                                },
                                user: {
                                    username,
                                    email,
                                    image: user_image
                                }
                            })
                        })
                        resolve(modifiedData)
                    } else {
                        reject([])
                    }
                }
            })
        })
    }
}
export default Posts