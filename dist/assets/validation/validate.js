"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function validate(body) {
    let emptyProperties = [];
    body = Object.entries(body);
    if (body !== null) {
        body.forEach((index) => {
            if (index[1] === "" ||
                Number.isNaN(index[1]) ||
                index[1] === 0 ||
                index[1] === undefined ||
                index[1] === false) {
                emptyProperties.push(`${index[0]}`);
            }
        });
    }
    return emptyProperties.toString();
}
exports.validate = validate;
