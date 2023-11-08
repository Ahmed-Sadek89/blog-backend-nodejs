"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SQLGeneration_1 = __importDefault(require("./SQLGeneration"));
class SQLPayload {
    static generateInsertPayload(modelName, params) {
        const payload = SQLGeneration_1.default.generateSQLSet({
            command: `insert into ${modelName} (`,
            params
        });
        return payload;
    }
    static generateReadByParamsPayload(modelName, params) {
        const payload = SQLGeneration_1.default.generateSQLWhere({
            command: `select * from ${modelName} where `,
            params
        });
        return payload;
    }
    static generateUpdatePaylaod(modelName, paramsSet, paramsWhere) {
        let payloadSet = SQLGeneration_1.default.genereteSQLUpdateSet({
            command: `update ${modelName} set `,
            params: paramsSet
        });
        let payloadWhere = SQLGeneration_1.default.generateSQLWhere({
            command: `${payloadSet.command} where `,
            params: paramsWhere
        });
        return {
            command: payloadWhere.command,
            paramsSet: payloadSet.params,
            paramsWhere: payloadWhere.params
        };
    }
    static generateDeletePayload(modelName, params) {
        const payload = SQLGeneration_1.default.generateSQLWhere({
            command: `delete from ${modelName} where `,
            params
        });
        return payload;
    }
}
exports.default = SQLPayload;
