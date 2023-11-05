import { sql_return, sql_update_return } from "../../dtos/sql.dto";
import { params } from "../../types/models.types"
import SQLGeneration from "./SQLGeneration"

class SQLPayload {
    public static generateInsertPayload(modelName: string, params: params): sql_return {
        const payload = SQLGeneration.generateSQLSet({
            command: `insert into ${modelName} (`,
            params
        })
        return payload
    }

    public static generateReadByParamsPayload(modelName: string, params: params): sql_return {
        const payload = SQLGeneration.generateSQLWhere({
            command: `select * from ${modelName} where `,
            params
        });
        return payload
    }

    public static generateUpdatePaylaod(modelName: string, paramsSet: params, paramsWhere: params): sql_update_return {
        let payloadSet = SQLGeneration.genereteSQLUpdateSet({
            command: `update ${modelName} set `,
            params: paramsSet
        });
        let payloadWhere = SQLGeneration.generateSQLWhere({
            command: `${payloadSet.command} where `,
            params: paramsWhere
        });

        return {
            command: payloadWhere.command,
            paramsSet: payloadSet.params,
            paramsWhere: payloadWhere.params
        }
    }

    public static generateDeletePayload(modelName: string, params: params): sql_return {
        const payload = SQLGeneration.generateSQLWhere({
            command: `delete from ${modelName} where `,
            params
        })
        return payload
    }
}

export default SQLPayload