"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = __importDefault(require("./model"));
const getUsersInfo_1 = require("../assets/UsersAssets/getUsersInfo");
const validate_1 = require("../assets/validation/validate");
const getUserInfo_1 = require("../assets/UsersAssets/getUserInfo");
class User extends model_1.default {
    constructor() {
        super("users");
    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.read()
                .then((result) => {
                resolve((0, getUsersInfo_1.getUsersInfo)(result));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getUserByParam(params) {
        return new Promise((resolve, reject) => {
            this.readByParams(params)
                .then((result) => {
                if (result) {
                    resolve((0, getUserInfo_1.getUserInfo)(result || {}));
                }
                else {
                    resolve({});
                }
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    register(rejester_data) {
        const emptyProperty = (0, validate_1.validate)(rejester_data);
        return new Promise((resolve, reject) => {
            if (emptyProperty.length > 0) {
                reject(`${emptyProperty} is required`);
            }
            else {
                const hashedPassword = bcrypt_1.default.hashSync(rejester_data.password, 10);
                this.insert(Object.assign(Object.assign({}, rejester_data), { password: hashedPassword }))
                    .then(() => {
                    resolve(`user ${rejester_data.username} inserted successfully`);
                })
                    .catch((Err) => {
                    reject(Err);
                });
            }
        });
    }
    login(login_data) {
        const { email, password } = login_data;
        return new Promise((resolve, reject) => {
            this.readByParams({ email })
                .then((res) => {
                if (!res) {
                    reject("email is not found");
                }
                return res;
            })
                .then((res) => {
                if (bcrypt_1.default.compareSync(password, res.password) === true) {
                    resolve({
                        id: res.id,
                        email: res.email,
                    });
                }
                else {
                    reject("incorrect password");
                }
            })
                .catch((e) => {
                reject("email is not found");
            });
        });
    }
    updateUser(user, params) {
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.readByParams({ id })
                .then((res) => {
                if (!res) {
                    reject(`user number ${id} is not found`);
                }
                else {
                    return res;
                }
            })
                .then((res) => {
                const hashedPassword = bcrypt_1.default.hashSync(user.password, 10);
                this.update(Object.assign(Object.assign({}, user), { password: hashedPassword || (res === null || res === void 0 ? void 0 : res.password), image: user.image || (res === null || res === void 0 ? void 0 : res.image) }), { id: id })
                    .then(() => {
                    resolve(`user number ${id} is updated successfully`);
                })
                    .catch(() => reject(`user number ${id} did not update successfully`));
            })
                .catch((e) => {
                reject(`user number ${id} is not found`);
            });
        });
    }
    deleteUser(params) {
        const { id } = params;
        return new Promise((resolve, reject) => {
            this.getUserByParam({ id })
                .then((res) => {
                if (!res) {
                    reject(`user number ${id} is not found`);
                }
                return res;
            })
                .then(() => {
                this.delete({ id })
                    .then(() => {
                    resolve(`user number ${id} is deleted successfully`);
                })
                    .catch(() => reject(`user number ${id} did not delete successfully`));
            })
                .catch(() => {
                reject(`user number ${id} is not found`);
            });
        });
    }
}
exports.default = User;
