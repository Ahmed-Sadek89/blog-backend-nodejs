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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotEnv = __importStar(require("dotenv"));
dotEnv.config();
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const secretKey = process.env.JWT_SECRET_KEY || "";
    if (!token) {
        return res.status(401).json({
            status: 404,
            result: "No token provided."
        });
    }
    else {
        jsonwebtoken_1.default.verify(token, secretKey, (error, decoded) => {
            if (error) {
                res.status(404).json({
                    status: 404,
                    result: "you are unauthorized !",
                });
            }
            else {
                // console.log({ tokenRes: decoded })
                next();
            }
        });
    }
};
exports.verifyToken = verifyToken;
