export interface sql_props{
    command: string, 
    object: { [x: string]: string | number } | null 
}

export interface sql_return{
    command: string, 
    values: (string | number)[] 
}

