import { params } from "../types/models.types"

export interface sql_props{
    command: string, 
    params: params | null 
}

export interface sql_return{
    command: string, 
    params: (string | number | undefined)[],
}

export interface sql_update_return{
    command: string, 
    paramsSet: (string | number | undefined)[],
    paramsWhere: (string | number | undefined)[] 
}

