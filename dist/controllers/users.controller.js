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
exports.deleteUserById = exports.updateUserById = exports.login = exports.rejester = exports.getuserById = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createToken_1 = require("../config/createToken");
const user = new user_model_1.default();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user.getAllUsers()
        .then((result) => {
        res.status(200).json({
            status: 200,
            count: result.length,
            result
        });
    })
        .catch(e => {
        res.status(404).json({
            status: 404,
            result: e
        });
    });
});
exports.getAllUsers = getAllUsers;
const getuserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield user.getUserByParam({ id })
        .then((result) => {
        const { password } = result, others = __rest(result, ["password"]);
        res.status(200).json({
            status: 200,
            result: others
        });
    })
        .catch(e => {
        res.status(404).json({
            status: 404,
            result: e
        });
    });
});
exports.getuserById = getuserById;
const rejester = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let { username, email, password } = req.body;
    let image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    console.log({ image: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path });
    yield user.register({ username, email, password, image })
        .then(() => {
        res.status(200).json({
            status: 200,
            result: `user ${username} inserted successfully`
        });
    })
        .catch(e => {
        res.status(400).json({
            status: 404,
            result: e
        });
    });
});
exports.rejester = rejester;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    const token = (0, createToken_1.createToken)({ email, password });
    yield user.login({ email, password })
        .then((result) => {
        res.status(200).json({
            status: 200,
            result,
            token
        });
    })
        .catch(e => {
        res.status(400).json({
            status: 404,
            result: e
        });
    });
});
exports.login = login;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { username, email, password } = req.body;
    const image = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path;
    const { id } = req.params;
    yield user.updateUser({ username, email, password, image }, { id })
        .then((result) => {
        res.status(200).json({
            status: 200,
            result
        });
    })
        .catch((error) => {
        res.status(400).json({
            status: 404,
            result: error
        });
    });
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield user.deleteUser({ id })
        .then((result) => {
        res.status(200).json({
            status: 200,
            result
        });
    })
        .catch((error) => {
        res.status(400).json({
            status: 404,
            result: error
        });
    });
});
exports.deleteUserById = deleteUserById;
