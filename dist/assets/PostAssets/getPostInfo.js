"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostInfo = void 0;
const getPosts_1 = require("./getPosts");
function getPostInfo(data) {
    return (0, getPosts_1.getPosts)(data)[0];
}
exports.getPostInfo = getPostInfo;
