"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SQLGeneration {
    static generateSQLSet(props) {
        let params = [];
        if (props.params !== null) {
            for (let key in props.params) {
                let value = props.params[key];
                props.command += `${key},`;
                params.push(value);
            }
            props.command = props.command.slice(0, -1) + `) values (?)`;
        }
        return {
            command: props.command,
            params
        };
    }
    static generateSQLWhere(props) {
        let params = [];
        if (props.params !== null) {
            for (let key in props.params) {
                let value = props.params[key];
                props.command += `${key}=? and `;
                params.push(value);
            }
            props.command = props.command.slice(0, -5);
        }
        return {
            command: props.command,
            params
        };
    }
    static genereteSQLUpdateSet(props) {
        let params = [];
        if (props.params !== null) {
            for (let key in props.params) {
                let value = props.params[key];
                props.command += `${key}= ?,`;
                params.push(value);
            }
            props.command = props.command.slice(0, -1);
        }
        return {
            command: props.command,
            params
        };
    }
}
exports.default = SQLGeneration;
