export interface sql_set_props{
    setCommand: string, 
    setObject: { [x: string]: string | number | undefined } | null 
}

export interface sql_set_return{
    setCommand: string, 
    setValues: (string | number | undefined)[] 
}



export interface sql_where_props{
    whereCommand: string, 
    whereObject: { [x: string]: string | number | undefined } | null 
}

export interface sql_where_return{
    whereCommand: string, 
    whereValues: (string | number | undefined)[] 
}
