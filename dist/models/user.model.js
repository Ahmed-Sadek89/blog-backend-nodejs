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
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = __importDefault(require("./model"));
class User extends model_1.default {
    constructor() {
        super('users');
    }
    getAllUsers() {
        const payload = this.read();
        return payload;
    }
    getUserByParam(params) {
        const payload = this.readByParams(params);
        return payload;
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
                    // .then((res) => {
                    //     console.log({password, hash: res.password}) 
                    //     const sadek = bcrypt.compare('1234', '$2b$10$sa6MH.2r') ;
                    //     console.log({sadek})
                    // })
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
            // check if email exist 
            //// true -> check in password
            ////// true -> login Success
        });
    }
}
exports.default = User;
