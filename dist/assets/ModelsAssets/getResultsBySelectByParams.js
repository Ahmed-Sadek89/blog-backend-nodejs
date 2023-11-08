"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultsBySelectByParams = void 0;
function getResultsBySelectByParams(data) {
    const rowObject = {};
    data.forEach((rowPacket) => {
        for (let key in rowPacket) {
            rowObject[key] = rowPacket[key];
        }
    });
    return rowObject;
}
exports.getResultsBySelectByParams = getResultsBySelectByParams;
