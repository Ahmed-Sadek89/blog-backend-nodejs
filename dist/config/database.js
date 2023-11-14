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
//   user: "root",
//   password: "",
//   host: "localhost",
//   database: "blog",
//   connectAttributes: {
//     _client_name: "mysql",
//     _client_version: "5.7.0",
//     _os: "Windows",
//     _platform: "Win32",
//     _runtime_version: "v12.18.0",
//     _tcp_sequence_no: 1,
//     program_name: "mysql",
//   },
// };
const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    connectAttributes: {
        _client_name: "mysql",
        _client_version: "5.7.0",
        _os: "Windows",
        _platform: "Win32",
        _runtime_version: "v12.18.0",
        _tcp_sequence_no: 1,
        program_name: "mysql",
    },
};
function connect() {
    return mysql_1.default.createConnection(Object.assign({}, config));
}
let connection = connect();
connection.connect((err) => {
    if (err) {
        console.error("Failed to connect to MySQL server.");
        connection = connect(); // Reconnect after 2 seconds.
    }
});
connection.on("error", (err) => {
    console.error("Connection lost to MySQL server:");
    console.error(err);
    if (err.code !== "") {
        connection = connect(); // Reconnect on the 'error' event.
    }
    else {
        throw err;
    }
});
connection.on("enqueue", () => {
    connection = connect();
});
exports.default = connection;
