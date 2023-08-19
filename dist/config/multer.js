"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.multerStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const multerStorage = (folderName) => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `src/uploads/${folderName}`);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    return storage;
};
exports.multerStorage = multerStorage;
const fileFilter = (_req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.fileFilter = fileFilter;
