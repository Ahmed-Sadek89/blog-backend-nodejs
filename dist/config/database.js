"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotEnv = __importStar(require("dotenv"));
dotEnv.config();
// const config = {
//     user: "root",
//     password: "",
//     host: "localhost",
//     database: "Blog"
// };
const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DB_NAME,
};
var connection;
function handleDisconnect() {
    connection = mysql_1.default.createConnection(Object.assign({}, config));
    connection.connect(function (err) {
        if (err) {
            console.log("error when connecting to db:", err);
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on("error", function (err) {
        console.log("db error", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleDisconnect();
        }
        else {
            throw err;
        }
    });
    return connection;
}
exports.default = handleDisconnect();
