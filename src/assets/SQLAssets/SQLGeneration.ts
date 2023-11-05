import { sql_props, sql_return } from "../../dtos/sql.dto"

class SQLGeneration {

    public static generateSQLSet(props: sql_props): sql_return {
        let params: (string | number | undefined)[] = []
        if (props.params !== null) {
            for (let key in props.params) {
                let value = props.params[key]
                props.command += `${key},`
                params.push(value)
            }
            props.command = props.command.slice(0, -1) + `) values (?)`;
        }
        return {
            command: props.command,
            params
        }
    }

    public static generateSQLWhere(props: sql_props): sql_return {
        let params: (string | number | undefined)[] = []
        if (props.params !== null) {

            for (let key in props.params) {
                let value = props.params[key]
                props.command += `${key}=? and `
                params.push(value)
            }
            props.command = props.command.slice(0, -5);
        }
        return {
            command: props.command,
            params
        }
    }

    public static genereteSQLUpdateSet(props: sql_props): sql_return {
        let params: (string | number | undefined)[] = []
        if (props.params !== null) {
            for (let key in props.params) {
                let value = props.params[key]
                props.command += `${key}= ?,`
                params.push(value)
            }
            props.command = props.command.slice(0, -1);
        }
        return {
            command: props.command,
            params
        }
    }


}

export default SQLGeneration