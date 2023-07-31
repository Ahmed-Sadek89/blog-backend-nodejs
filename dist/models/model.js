"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
class Model {
    constructor(modelName) {
        this.modelName = modelName;
    }
    SQLSet(props) {
        let { command, object } = props;
        let values = [];
        if (object !== null) {
            for (let key in object) {
                let value = object[key];
                command += `${key},`;
                values.push(value);
            }
            command = command.slice(0, -1);
            command += `) values (?)`;
        }
        return {
            command,
            values
        };
    }
    SQLWhere(props) {
        let { command, object } = props;
        let values = [];
        if (object !== null) {
            //SELECT * FROM users WHERE id = ? AND email = ?
            for (let key in object) {
                let value = object[key];
                command += `${key}=? and `;
                values.push(value);
            }
            command = command.slice(0, -5);
        }
        return {
            command,
            values
        };
    }
    insert(params) {
        //make sql command and its keys 
        let sql = `insert into ${this.modelName} (`;
        const { command, values } = this.SQLSet({ command: sql, object: params });
        // make the query
        return new Promise((resolve, reject) => {
            database_1.default.query(command, [values], (error, data) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    read() {
        const command = `select * from ${this.modelName}`;
        return new Promise((resolve, reject) => {
            database_1.default.query(command, (error, data) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    readByParams(params) {
        const sql = `select * from ${this.modelName} where `;
        const { command, values } = this.SQLWhere({ command: sql, object: params });
        return new Promise((resolve, reject) => {
            database_1.default.query(command, [values], (error, data) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    if (data.length > 0) {
                        const rowObject = {};
                        data.forEach((rowPacket) => {
                            for (let key in rowPacket) {
                                rowObject[key] = rowPacket[key];
                            }
                        });
                        resolve(rowObject);
                    }
                    else {
                        reject({});
                    }
                }
            });
        });
    }
    update() {
    }
    delete() {
    }
}
exports.default = Model;
