export interface users{
    username: string,
    email: string, 
    password: string, 
    image: string
}

export interface user_login{
    email: string, 
    password: string, 
}

export interface users_info{
    id: number, 
    username: string, 
    email: string,
    password?: string, 
    image: string, 
    created_: Date
}
