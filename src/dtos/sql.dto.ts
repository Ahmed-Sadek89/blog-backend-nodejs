export interface sql_set_props{
    setCommand: string, 
    setObject: { [x: string]: string | number } | null 
}

export interface sql_set_return{
    setCommand: string, 
    setValues: (string | number)[] 
}



export interface sql_where_props{
    whereCommand: string, 
    whereObject: { [x: string]: string | number } | null 
}

export interface sql_where_return{
    whereCommand: string, 
    whereValues: (string | number)[] 
}
