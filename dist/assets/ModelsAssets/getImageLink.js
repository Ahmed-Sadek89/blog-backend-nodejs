"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageLink = void 0;
function getImageLink(image, folderName) {
    const backendLink = `${process.env.BACK_END_IMAGE_LINK}/`;
    if (image === null || image === void 0 ? void 0 : image.includes(backendLink)) {
        return image;
    }
    else {
        return `${process.env.BACK_END_IMAGE_LINK}/${folderName}/${image}`;
    }
}
exports.getImageLink = getImageLink;
