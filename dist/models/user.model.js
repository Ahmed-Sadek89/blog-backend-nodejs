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
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = __importDefault(require("./model"));
class User extends model_1.default {
    constructor() {
        super('users');
    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.read()
                .then((result) => {
                let data = [];
                result.map((index) => {
                    let { password } = index, others = __rest(index, ["password"]);
                    data.push(others);
                });
                resolve(data);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    getUserByParam(params) {
        return new Promise((resolve, reject) => {
            this.readByParams(params)
                .then((result) => {
                let { password } = result, others = __rest(result, ["password"]);
                resolve(others);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    register(rejester_data) {
        const { username, email, password, image } = rejester_data;
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const payload = this.insert({
            username, email, password: hashedPassword, image
        });
        return payload;
    }
    login(login_data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = login_data;
            return new Promise((resolve, reject) => {
                this.getUserByParam({ email })
                    .then((res) => {
                    if (!res) {
                        reject('email is not found');
                    }
                    return res;
                })
                    .then((res) => {
                    if (bcrypt_1.default.compareSync(password, res.password) === true) {
                        resolve('login success');
                    }
                    else {
                        reject('incorrect password');
                    }
                })
                    .catch(() => {
                    reject('email is not found');
                });
            });
        });
    }
    updateUser({ username, email, password, image }, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.getUserByParam({ id })
                    .then((res) => {
                    if (!res) {
                        reject(`user number ${id} is not found`);
                    }
                    return res;
                })
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
                    yield this.update({
                        username: username || res.username,
                        email: email || res.email,
                        password: hashedPassword || res.password,
                        image: image || res.image
                    }, { id })
                        .then(() => {
                        resolve(`user number ${id} is updated successfully`);
                    })
                        .catch(() => reject(`user number ${id} did not update successfully`));
                }))
                    .catch(() => {
                    reject(`user number ${id} is not found`);
                });
            });
        });
    }
    deleteUser({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.getUserByParam({ id })
                    .then((res) => {
                    if (!res) {
                        reject(`user number ${id} is not found`);
                    }
                    return res;
                })
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    yield this.delete({ id })
                        .then(() => {
                        resolve(`user number ${id} is deleted successfully`);
                    })
                        .catch(() => reject(`user number ${id} did not delete successfully`));
                }))
                    .catch(() => {
                    reject(`user number ${id} is not found`);
                });
            });
        });
    }
}
exports.default = User;
