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
exports.getPosts = void 0;
const getImageLink_1 = require("../ModelsAssets/getImageLink");
function getPosts(data) {
    let modifiedData = [];
    data.map((index) => {
        let { cat_id, cat_name, username, email, image } = index, others = __rest(index, ["cat_id", "cat_name", "username", "email", "image"]);
        const post_image = (0, getImageLink_1.getImageLink)(index.post_image, "posts");
        const user_image = (0, getImageLink_1.getImageLink)(image, "users");
        modifiedData.push(Object.assign(Object.assign({}, others), { post_image, category: {
                cat_id,
                cat_name,
            }, user: {
                username,
                email,
                image: user_image,
            } }));
    });
    return modifiedData;
}
exports.getPosts = getPosts;
