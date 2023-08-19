"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("../multer");
const usersStorage = (0, multer_2.multerStorage)('users');
exports.usersUpload = (0, multer_1.default)({
    storage: usersStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: multer_2.fileFilter
});
