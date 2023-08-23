import connection from "../config/database";
import { posts, postsByUser } from "../dtos/posts.dto";
import Model from "./model";

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

    public addNewPost(post: posts) {
        const { title, description, image, category_id, user_id } = post;
        const emptyProperties = this.validation(post);
        return new Promise((resolve, reject) => {
            if (emptyProperties.length > 0) {
                reject(`proprety ${emptyProperties} is requried`)
            } else {
                this.insert({ title, description, image, category_id, user_id })
                    .then(() => {
                        resolve(`new post inserted successfully`)
                    })
                    .catch(() => {
                        reject(`new post did not insert!`)
                    })
            }
        })
    }

    public updatePostById(body: posts, params: { [x: string]: string | number }) {
        const { title, description, image, category_id } = body;
        const { id } = params;
        const emptyProperties = this.validation(body);
        return new Promise((resolve, reject) => {
            if (emptyProperties.length > 0) {
                reject(`proprety ${emptyProperties} is requried`)
            } else {
                this.update({ title, description, image, category_id }, { id })
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
            connection.query(
                `select 
                    posts.id, posts.title, posts.description, posts.post_image, 
                    categories.cat_name, 
                    users.username, users.email, users.image 
                from posts
                inner join categories on posts.category_id=categories.id
                inner join users on posts.user_id=users.id
                where posts.id=${id}`, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    if (data.length > 0) {
                        let modifiedData: postsByUser[] = []
                        data.map((index: any) => {
                            let { username, email, image, ...others } = index;
                            modifiedData.push({ ...others, user: { username, email, image } })
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
                    posts.id, posts.title, posts.description, posts.post_image, 
                    categories.cat_name, 
                    users.username, users.email, users.image 
                from posts
                inner join categories on posts.category_id=categories.id
                inner join users on posts.user_id=users.id
                order by posts.updated_at desc`, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    if (data.length > 0) {
                        let modifiedData: postsByUser[] = []
                        data.map((index: any) => {
                            let { username, email, image, ...others } = index;
                            modifiedData.push({ ...others, user: { username, email, image } })
                        })
                        resolve(modifiedData)
                    } else {
                        reject([])
                    }
                }
            })
        })
    }


    public getLatestPostByCategory(params: {[x: string]: string| number| undefined}) {
        let { categoryId } = params
        return new Promise((resolve, reject) => {
            connection.query(
                `select 
                    posts.id, posts.title, posts.description, posts.post_image, 
                    categories.cat_name, 
                    users.username, users.email, users.image 
                from posts
                inner join categories on posts.category_id=categories.id
                inner join users on posts.user_id=users.id
                where posts.category_id=${categoryId} order by posts.updated_at desc`, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    if (data.length > 0) {
                        let modifiedData: postsByUser[] = []
                        data.map((index: any) => {
                            let { username, email, image, ...others } = index;
                            modifiedData.push({ ...others, user: { username, email, image } })
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