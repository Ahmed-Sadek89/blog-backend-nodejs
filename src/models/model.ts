import connection from '../config/database';
import { sql_set_props, sql_set_return, sql_where_props, sql_where_return } from '../dtos/sql.dto';



class Model {

    constructor(protected modelName: string) { }

    private SQLSet(props: sql_set_props): sql_set_return {
        let { setCommand, setObject } = props
        let setValues: (string | number| undefined)[] = []
        if (setObject !== null) {
            for (let key in setObject) {
                let value = setObject[key]
                setCommand += `${key},`
                setValues.push(value)
            }
            setCommand = setCommand.slice(0, -1);
            setCommand += `) values (?)`
        }
        return {
            setCommand,
            setValues
        }
    }

    private SQLWhere(props: sql_where_props): sql_where_return {
        let { whereCommand, whereObject } = props
        let whereValues: (string | number| undefined)[] = []
        if (whereObject !== null) {

            for (let key in whereObject) {
                let value = whereObject[key]
                whereCommand += `${key}=? and `
                whereValues.push(value)
            }
            whereCommand = whereCommand.slice(0, -5);
        }
        return {
            whereCommand,
            whereValues
        }
    }

    private SQLUpdateSet(props: sql_set_props): sql_set_return {
        let { setCommand, setObject } = props
        let setValues: (string | number| undefined)[] = []
        if (setObject !== null) {
            for (let key in setObject) {
                let value = setObject[key]
                setCommand += `${key}= ?,`
                setValues.push(value)
            }
            setCommand = setCommand.slice(0, -1);
        }
        return {
            setCommand,
            setValues
        }
    }

    protected insert(params: { [x: string]: string | number | undefined }) {
        //make sql command and its keys 
        let sql = `insert into ${this.modelName} (`;
        const { setCommand, setValues } = this.SQLSet({ setCommand: sql, setObject: params })

        // make the query
        return new Promise((resolve, reject) => {
            connection.query(setCommand, [setValues], (error, data) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve(data)
                }
            })
        })
    }

    protected read() {
        const command = `select * from ${this.modelName}`;
        return new Promise((resolve, reject) => {
            connection.query(command, (error, data) => {
                if (error) {
                    reject(error.message)
                } else {
                    if (data.length > 0) {
                        let result: any[] = []
                        let rowObject: any = {}
                        data.forEach((RowDataPacket: any) => {
                            for (let key in RowDataPacket) {
                                rowObject[key] = RowDataPacket[key];
                            }
                            result.push(rowObject)
                            rowObject = {}
                        });
                        resolve(result)
                    }
                }
            })
        })
    }

    protected readByParams(params: { [x: string]: string | number | undefined }) {
        const sql = `select * from ${this.modelName} where `;
        const { whereCommand, whereValues } = this.SQLWhere({ whereCommand: sql, whereObject: params });
        return new Promise((resolve, reject) => {
            connection.query(whereCommand, [whereValues], (error, data) => {
                if (error) {
                    reject(error.message)
                } else {
                    if (data.length > 0) {
                        const rowObject: { [key: string]: any } = {};
                        data.forEach((rowPacket: any) => {

                            for (let key in rowPacket) {
                                rowObject[key] = rowPacket[key];
                            }

                        });
                        resolve(rowObject)
                    } else {
                        reject({})
                    }
                }
            })
        })
    }

    protected update(paramsSet: { [x: string]: string | number | undefined }, paramsWhere: { [x: string]: string | number | undefined }) {
        let sqlSet = `update ${this.modelName} set `
        let { setCommand, setValues } = this.SQLUpdateSet({ setCommand: sqlSet, setObject: paramsSet });
        let { whereCommand, whereValues } = this.SQLWhere({ whereCommand: `${setCommand} where `, whereObject: paramsWhere });
        const sql = whereCommand;
        // console.log({sql, setValues, whereValues})
        return new Promise((resolve, reject) => {
            connection.query(sql, [...setValues, ...whereValues], (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(data)
                }
            })
        })
    }

    protected delete(params: { [x: string]: string | number | undefined }) {
        const sql = `delete from ${this.modelName} where `;
        const { whereCommand, whereValues } = this.SQLWhere({ whereCommand: sql, whereObject: params });
        return new Promise((resolve, reject) => {
            connection.query(whereCommand, [...whereValues], (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            })
        })
    }
}

export default Model