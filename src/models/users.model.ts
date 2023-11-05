import bcrypt from 'bcrypt'
import { users, user_login, users_info } from '../dtos/users.dto'
import Model from "./model";
import { getUsersInfo } from '../assets/UsersAssets/getUsersInfo';
import { params } from '../types/models.types';

class User extends Model {
    constructor() {
        super('users');
    }

    public getAllUsers() {
        return new Promise((resolve, reject) => {
            this.read()
                .then((result: any) => {
                    resolve(getUsersInfo(result))
                })
                .catch(error => {
                    reject(error)
                })

        })
    }

    public getUserByParam(params: params) {
        return new Promise((resolve, reject) => {
            this.readByParams(params)
                .then((result: any) => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })

        })
    }

    public register(rejester_data: users) {
        const { username, email, password, image } = rejester_data
        const hashedPassword = bcrypt.hashSync(password, 10);
        const payload = this.insert({
            username, email, password: hashedPassword, image
        })
        return payload

    }

    public async login(login_data: user_login) {
        const { email, password } = login_data;
        return new Promise((resolve, reject) => {
            this.getUserByParam({ email })
                .then((res: any) => {
                    if (!res) {
                        reject('email is not found')
                    }
                    return res as users
                })
                .then((res) => {
                    if (bcrypt.compareSync(password, res.password) === true) {
                        resolve('login success')
                    } else {
                        reject('incorrect password')
                    }
                })
                .catch((e) => {
                    reject('email is not found');
                })

        })
    }

    public async updateUser(user: users, params: params) {
        return new Promise((resolve, reject) => {
            this.getUserByParam({ id: params.id })
                .then((res) => {
                    if (!res) {
                        reject(`user number ${params.id} is not found`)
                    }
                    return res as users
                })
                .then(async (res) => {
                    const hashedPassword = bcrypt.hashSync(user.password, 10);
                    await this.update(
                        {
                            username: user.username || res.username,
                            email: user.email || res.email,
                            password: hashedPassword || res.password,
                            image: user.image || res.image
                        },
                        { id: params.id }
                    )
                        .then(() => {
                            resolve(`user number ${params.id} is updated successfully`)
                        })
                        .catch(() => reject(`user number ${params.id} did not update successfully`))
                })
                .catch(() => {
                    reject(`user number ${params.id} is not found`)
                })
        })
    }

    public async deleteUser(params: params) {
        return new Promise((resolve, reject) => {
            this.getUserByParam({ id: params.id })
                .then((res) => {
                    if (!res) {
                        reject(`user number ${params.id} is not found`)
                    }
                    return res as users
                })
                .then(async (res) => {
                    await this.delete({ id: params.id })
                        .then(() => {
                            resolve(`user number ${params.id} is deleted successfully`)
                        })
                        .catch(() => reject(`user number ${params.id} did not delete successfully`))
                })
                .catch(() => {
                    reject(`user number ${params.id} is not found`)
                })
        })
    }
}

export default User;
