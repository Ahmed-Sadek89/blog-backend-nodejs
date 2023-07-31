"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config = {
    user: "root",
    password: "",
    host: "localhost",
    database: "Blog"
};
const connection = mysql_1.default.createConnection(Object.assign({}, config));
exports.default = connection;
