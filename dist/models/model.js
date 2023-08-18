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
        let { setCommand, setObject } = props;
        let setValues = [];
        if (setObject !== null) {
            for (let key in setObject) {
                let value = setObject[key];
                setCommand += `${key},`;
                setValues.push(value);
            }
            setCommand = setCommand.slice(0, -1);
            setCommand += `) values (?)`;
        }
        return {
            setCommand,
            setValues
        };
    }
    SQLWhere(props) {
        let { whereCommand, whereObject } = props;
        let whereValues = [];
        if (whereObject !== null) {
            for (let key in whereObject) {
                let value = whereObject[key];
                whereCommand += `${key}=? and `;
                whereValues.push(value);
            }
            whereCommand = whereCommand.slice(0, -5);
        }
        return {
            whereCommand,
            whereValues
        };
    }
    SQLUpdateSet(props) {
        let { setCommand, setObject } = props;
        let setValues = [];
        if (setObject !== null) {
            for (let key in setObject) {
                let value = setObject[key];
                setCommand += `${key}= ?,`;
                setValues.push(value);
            }
            setCommand = setCommand.slice(0, -1);
        }
        return {
            setCommand,
            setValues
        };
    }
    insert(params) {
        //make sql command and its keys 
        let sql = `insert into ${this.modelName} (`;
        const { setCommand, setValues } = this.SQLSet({ setCommand: sql, setObject: params });
        // make the query
        return new Promise((resolve, reject) => {
            database_1.default.query(setCommand, [setValues], (error, data) => {
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
                    if (data.length > 0) {
                        let result = [];
                        let rowObject = {};
                        data.forEach((RowDataPacket) => {
                            for (let key in RowDataPacket) {
                                rowObject[key] = RowDataPacket[key];
                            }
                            result.push(rowObject);
                            rowObject = {};
                        });
                        resolve(result);
                    }
                }
            });
        });
    }
    readByParams(params) {
        const sql = `select * from ${this.modelName} where `;
        const { whereCommand, whereValues } = this.SQLWhere({ whereCommand: sql, whereObject: params });
        return new Promise((resolve, reject) => {
            database_1.default.query(whereCommand, [whereValues], (error, data) => {
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
    update(paramsSet, paramsWhere) {
        let sqlSet = `update ${this.modelName} set `;
        let { setCommand, setValues } = this.SQLUpdateSet({ setCommand: sqlSet, setObject: paramsSet });
        let { whereCommand, whereValues } = this.SQLWhere({ whereCommand: `${setCommand} where `, whereObject: paramsWhere });
        const sql = whereCommand;
        // console.log({sql, setValues, whereValues})
        return new Promise((resolve, reject) => {
            database_1.default.query(sql, [...setValues, ...whereValues], (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    delete(params) {
        const sql = `delete from ${this.modelName} where `;
        const { whereCommand, whereValues } = this.SQLWhere({ whereCommand: sql, whereObject: params });
        return new Promise((resolve, reject) => {
            database_1.default.query(whereCommand, [...whereValues], (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            });
        });
    }
}
exports.default = Model;
