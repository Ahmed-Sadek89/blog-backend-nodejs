import bcrypt from 'bcrypt'
import { users, user_login, users_info } from '../dtos/users.dto'
import Model from "./model";

class User extends Model {
    constructor() {
        super('users');
    }

    public getAllUsers() {
        return new Promise((resolve, reject) => {
            this.read()
                .then((result: any) => {
                    let data: users_info[] = []
                    result.map((index: users_info) => {
                        let { password, ...others } = index;
                        data.push(others)
                    })
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })

        })
    }

    public getUserByParam(params: { [x: string]: string | number | undefined }) {
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

    public async updateUser({ username, email, password, image }: users, { id }: { [x: string]: string | undefined | number }) {
        return new Promise((resolve, reject) => {
            this.getUserByParam({ id })
                .then((res) => {
                    if (!res) {
                        reject(`user number ${id} is not found`)
                    }
                    return res as users
                })
                .then(async (res) => {
                    const hashedPassword = bcrypt.hashSync(password, 10);
                    await this.update(
                        {
                            username: username || res.username,
                            email: email || res.email,
                            password: hashedPassword || res.password,
                            image: image || res.image
                        },
                        { id }
                    )
                        .then(() => {
                            resolve(`user number ${id} is updated successfully`)
                        })
                        .catch(() => reject(`user number ${id} did not update successfully`))
                })
                .catch(() => {
                    reject(`user number ${id} is not found`)
                })
        })
    }

    public async deleteUser({ id }: { [x: string]: string | number }) {
        return new Promise((resolve, reject) => {
            this.getUserByParam({ id })
                .then((res) => {
                    if (!res) {
                        reject(`user number ${id} is not found`)
                    }
                    return res as users
                })
                .then(async (res) => {
                    await this.delete({ id })
                        .then(() => {
                            resolve(`user number ${id} is deleted successfully`)
                        })
                        .catch(() => reject(`user number ${id} did not delete successfully`))
                })
                .catch(() => {
                    reject(`user number ${id} is not found`)
                })
        })
    }
}

export default User;
