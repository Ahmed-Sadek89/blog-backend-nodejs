"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SQLPayload_1 = __importDefault(require("../assets/SQLAssets/SQLPayload"));
const getResultsBySelectAll_1 = require("../assets/ModelsAssets/getResultsBySelectAll");
const getResultsBySelectByParams_1 = require("../assets/ModelsAssets/getResultsBySelectByParams");
const database_1 = __importDefault(require("../config/database"));
class Model {
    constructor(modelName) {
        this.modelName = modelName;
    }
    insert(values) {
        return new Promise((resolve, reject) => {
            const { command, params } = SQLPayload_1.default.generateInsertPayload(this.modelName, values);
            database_1.default.query(command, [params], (error, data) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(data);
                }
            });
            database_1.default.end((err) => {
                if (err)
                    throw err;
                console.log("Connection closed.");
            });
        });
    }
    read() {
        return new Promise((resolve, reject) => {
            const command = `select * from ${this.modelName}`;
            database_1.default.query(command, (error, data) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    if (data.length > 0) {
                        resolve((0, getResultsBySelectAll_1.getResultsBySelectAll)(data));
                    }
                    else {
                        reject([]);
                    }
                }
            });
            database_1.default.end((err) => {
                if (err)
                    throw err;
                console.log("Connection closed.");
            });
        });
    }
    readByParams(values) {
        return new Promise((resolve, reject) => {
            const { command, params } = SQLPayload_1.default.generateReadByParamsPayload(this.modelName, values);
            database_1.default.query(command, [params], (error, data) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    if (data.length > 0) {
                        resolve((0, getResultsBySelectByParams_1.getResultsBySelectByParams)(data));
                    }
                    else {
                        resolve({});
                    }
                }
            });
            database_1.default.end((err) => {
                if (err)
                    throw err;
                console.log("Connection closed.");
            });
        });
    }
    update(valuesSet, valuesWhere) {
        return new Promise((resolve, reject) => {
            let { command, paramsSet, paramsWhere } = SQLPayload_1.default.generateUpdatePaylaod(this.modelName, valuesSet, valuesWhere);
            database_1.default.query(command, [...paramsSet, ...paramsWhere], (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
            database_1.default.end((err) => {
                if (err)
                    throw err;
                console.log("Connection closed.");
            });
        });
    }
    delete(values) {
        return new Promise((resolve, reject) => {
            const { command, params } = SQLPayload_1.default.generateDeletePayload(this.modelName, values);
            database_1.default.query(command, [...params], (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            });
            database_1.default.end((err) => {
                if (err)
                    throw err;
                console.log("Connection closed.");
            });
        });
    }
}
exports.default = Model;
