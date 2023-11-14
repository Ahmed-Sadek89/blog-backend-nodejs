"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const getImageLink_1 = require("../ModelsAssets/getImageLink");
function getUserInfo(result) {
    const _a = result, { password, image } = _a, others = __rest(_a, ["password", "image"]);
    const user_image = (0, getImageLink_1.getImageLink)(image, "users");
    return Object.assign(Object.assign({}, others), { image: user_image });
}
exports.getUserInfo = getUserInfo;
