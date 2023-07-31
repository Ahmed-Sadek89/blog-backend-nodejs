import connection from '../config/database';
import { sql_props, sql_return } from '../dtos/sql.dto';



class Model {

    constructor(protected modelName: string) { }

    private SQLSet(props: sql_props): sql_return {
        let { command, object } = props
        let values: (string | number)[] = []
        if (object !== null) {
            for (let key in object) {
                let value = object[key]
                command += `${key},`
                values.push(value)
            }
            command = command.slice(0, -1);
            command += `) values (?)`
        }
        return {
            command,
            values
        }
    }

    private SQLWhere(props: sql_props): sql_return {
        let { command, object } = props
        let values: (string | number)[] = []
        if (object !== null) {

            //SELECT * FROM users WHERE id = ? AND email = ?
            for (let key in object) {
                let value = object[key]
                command += `${key}=? and `
                values.push(value)
            }
            command = command.slice(0, -5);
        }
        return {
            command,
            values
        }
    }

    protected insert(params: { [x: string]: string | number }) {
        //make sql command and its keys 
        let sql = `insert into ${this.modelName} (`;
        const { command, values } = this.SQLSet({command: sql, object: params })

        // make the query
        return new Promise((resolve, reject) => {
            connection.query(command, [values], (error, data) => {
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
                    resolve(data)
                }
            })
        })
    }

    protected readByParams(params: { [x: string]: string | number }) {
        const sql = `select * from ${this.modelName} where `;
        const { command, values } = this.SQLWhere({command: sql, object: params});
        return new Promise((resolve, reject) => {
            connection.query(command, [values], (error, data) => {
                if (error) {
                    reject(error.message)
                } else {
                    if (data.length > 0){
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

    protected update() {

    }

    protected delete() {

    }
}

export default Model