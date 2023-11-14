"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function validate(body) {
    let emptyProperties = [];
    body = Object.entries(body);
    if (body !== null) {
        const isValidate = (value) => {
            return (value === "" ||
                Number.isNaN(value) ||
                value === 0 ||
                value === "0" ||
                value === undefined ||
                value === null ||
                value === false);
        };
        body.forEach((index) => {
            if (isValidate(index[1])) {
                emptyProperties.push(`${index[0]}`);
            }
        });
    }
    return emptyProperties.toString();
}
exports.validate = validate;
