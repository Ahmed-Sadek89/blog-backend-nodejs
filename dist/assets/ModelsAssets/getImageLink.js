"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageLink = void 0;
function getImageLink(image) {
    let splitImage = image.split('\\');
    let imageLink = `${process.env.BACK_END_IMAGE_LINK}/${splitImage[2]}/${splitImage[3]}`;
    return imageLink;
}
exports.getImageLink = getImageLink;
