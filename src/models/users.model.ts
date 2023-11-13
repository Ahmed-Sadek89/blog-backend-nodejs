import bcrypt from "bcrypt";
import { users, user_login } from "../dtos/users.dto";
import Model from "./model";
import { getUsersInfo } from "../assets/UsersAssets/getUsersInfo";
import { params } from "../types/models.types";
import { validate } from "../assets/validation/validate";

class User extends Model {
  constructor() {
    super("users");
  }

  public getAllUsers() {
    return new Promise((resolve, reject) => {
      this.read()
        .then((result: any) => {
          resolve(getUsersInfo(result));
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public getUserByParam(params: params) {
    return new Promise((resolve, reject) => {
      this.readByParams(params)
        .then((result: any) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public register(rejester_data: users) {
    const emptyProperty = validate(rejester_data);
    return new Promise((resolve, reject) => {
      if (emptyProperty.length > 0) {
        reject(`property ${emptyProperty} is required`);
      } else {
        const hashedPassword = bcrypt.hashSync(rejester_data.password, 10);
        this.insert({
          ...rejester_data,
          password: hashedPassword,
        })
          .then(() => {
            resolve(`user ${rejester_data.username} inserted successfully`);
          })
          .catch((Err) => {
            reject(Err);
          });
      }
    });
  }

  public login(login_data: user_login) {
    const { email, password } = login_data;
    return new Promise((resolve, reject) => {
      this.getUserByParam({ email })
        .then((res: any) => {
          if (!res) {
            reject("email is not found");
          }
          return res as users;
        })
        .then((res) => {
          if (bcrypt.compareSync(password, res.password) === true) {
            resolve({
              id: res.id,
              email: res.email,
            });
          } else {
            reject("incorrect password");
          }
        })
        .catch((e) => {
          reject("email is not found");
        });
    });
  }

  public updateUser(user: users, params: params) {
    return new Promise((resolve, reject) => {
      this.getUserByParam({ id: params.id })
        .then((res) => {
          if (!res) {
            reject(`user number ${params.id} is not found`);
          } else {
            return res as users;
          }
        })
        .then((res) => {
          const hashedPassword = bcrypt.hashSync(user.password, 10);
          this.update(
            {
              username: user.username || res?.username,
              email: user.email || res?.email,
              password: hashedPassword || res?.password,
              image: user.image || res?.image,
            },
            { id: params.id }
          )
            .then(() => {
              resolve(`user number ${params.id} is updated successfully`);
            })
            .catch(() =>
              reject(`user number ${params.id} did not update successfully`)
            );
        })
        .catch(() => {
          reject(`user number ${params.id} is not found`);
        });
    });
  }

  public deleteUser(params: params) {
    return new Promise((resolve, reject) => {
      this.getUserByParam({ id: params.id })
        .then((res) => {
          if (!res) {
            reject(`user number ${params.id} is not found`);
          }
          return res as users;
        })
        .then(() => {
          this.delete({ id: params.id })
            .then(() => {
              resolve(`user number ${params.id} is deleted successfully`);
            })
            .catch(() =>
              reject(`user number ${params.id} did not delete successfully`)
            );
        })
        .catch(() => {
          reject(`user number ${params.id} is not found`);
        });
    });
  }
}

export default User;
