"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultsBySelectAll = void 0;
function getResultsBySelectAll(data) {
    let result = [];
    let rowObject = {};
    data.forEach((RowDataPacket) => {
        for (let key in RowDataPacket) {
            rowObject[key] = RowDataPacket[key];
        }
        result.push(rowObject);
        rowObject = {};
    });
    return result;
}
exports.getResultsBySelectAll = getResultsBySelectAll;
