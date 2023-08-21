import { categories } from "../dtos/category.dto";
import Model from "./model";

class Categories extends Model {
    constructor(){
        super('categories')
    }

    public addNewCategory(category: categories) {
        const { cat_name } = category
        const payload = this.insert({cat_name});
        return payload
    }

    public getAllCategories() {
        return new Promise((resolve, reject) => {
            this.read()
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    public getCategoryById(params: {[x: string]: number | string | undefined}) {
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.readByParams({id})
            .then((result) => {
                resolve(result)
            })
            .catch(() => {
                reject(`no catgory has id ${id}`)
            })
        })
    }

    public deleteCategoryById(params: {[x: string]: number | string | undefined}) {
        const { id } = params
        return new Promise((resolve, reject) => {
            this.readByParams({ id })
                .then((res) => {
                    if (!res) {
                        reject(`category number ${id} is not found`)
                    }
                    return res as categories
                })
                .then(async () => {
                    await this.delete({ id })
                        .then(() => {
                            resolve(`category number ${id} is deleted successfully`)
                        })
                        .catch(() => reject(`category number ${id} did not delete successfully`))
                })
                .catch(() => {
                    reject(`category number ${id} is not found`)
                })
        })
    }

    public updateCategoryById(body: categories, params: {[x: string]: number | string | undefined}) {
        const { cat_name } = body;
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.readByParams({ id })
                .then((res) => {
                    if (!res) {
                        reject(`category number ${id} is not found`)
                    }
                    return res as categories
                })
                .then(async (res) => {
                    await this.update(
                        {
                            cat_name: cat_name || res.cat_name
                        },
                        { id }
                    )
                        .then(() => {
                            resolve(`category number ${id} is updated successfully`)
                        })
                        .catch(() => reject(`category number ${id} did not update successfully`))
                })
                .catch(() => {
                    reject(`category number ${id} is not found`)
                })
        })
    }
}

export default Categories