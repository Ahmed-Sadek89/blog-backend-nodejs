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
const model_1 = __importDefault(require("./model"));
class Categories extends model_1.default {
    constructor() {
        super("categories");
    }
    addNewCategory(category) {
        const { cat_name } = category;
        return new Promise((resolve, reject) => {
            this.insert({ cat_name })
                .then(() => resolve(cat_name))
                .catch((error) => reject(error));
        });
    }
    getAllCategories() {
        return new Promise((resolve, reject) => {
            this.read()
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
    getCategoryById(params) {
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.readByParams({ id })
                .then((result) => resolve(result))
                .catch(() => reject(`no catgory has id ${id}`));
        });
    }
    deleteCategoryById(params) {
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.readByParams({ id })
                .then((res) => {
                if (!res) {
                    reject(`category number ${id} is not found`);
                }
                return res;
            })
                .then(() => {
                this.delete({ id })
                    .then(() => {
                    resolve(`category number ${id} is deleted successfully`);
                })
                    .catch(() => reject(`category number ${id} did not delete successfully`));
            })
                .catch(() => {
                reject(`category number ${id} is not found`);
            });
        });
    }
    updateCategoryById(body, params) {
        const { cat_name } = body;
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.readByParams({ id })
                .then((res) => {
                if (!res) {
                    reject(`category number ${id} is not found`);
                }
                return res;
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                yield this.update({
                    cat_name: cat_name || res.cat_name,
                }, { id })
                    .then(() => {
                    resolve(`category number ${id} is updated successfully`);
                })
                    .catch(() => reject(`category number ${id} did not update successfully`));
            }))
                .catch(() => {
                reject(`category number ${id} is not found`);
            });
        });
    }
}
exports.default = Categories;
