import bcrypt from 'bcrypt'
import {users, user_login} from '../dtos/users.dto'
import Model from "./model";

class User extends Model {
    constructor() {
        super('users');
    }

    public getAllUsers() {
        const payload = this.read();
        return payload
    }

    public getUserByParam(params: { [x: string]: string|number}) {
        const payload = this.readByParams(params);
        return payload
    }

    public register( rejester_data: users ) {
        const { username, email, password, image } = rejester_data
        const hashedPassword =  bcrypt.hashSync(password, 10);
        const payload = this.insert({
            username, email, password: hashedPassword, image
        })
        return payload
    }

    public async login(login_data: user_login) {
        const { email, password } = login_data;
        return new Promise((resolve, reject) => {
            this.getUserByParam({email})
            .then((res) => {
                if (!res) {
                    reject('email is not found')
                }
                return res as users
            })
            // .then((res) => {
            //     console.log({password, hash: res.password}) 
            //     const sadek = bcrypt.compare('1234', '$2b$10$sa6MH.2r') ;
            //     console.log({sadek})
            // })
            .then((res) => {
                if (  bcrypt.compareSync(password, res.password)  === true ) {
                    resolve('login success')
                } else {
                    reject('incorrect password')
                }
            })
            .catch(() => {
                reject('email is not found')
            })

        })
       // check if email exist 
       //// true -> check in password
       ////// true -> login Success
       
    }
}

export default User;