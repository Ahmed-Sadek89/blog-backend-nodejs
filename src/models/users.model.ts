import bcrypt from "bcrypt";
import {
  user,
  user_input,
  user_login,
  user_output,
  user_token,
} from "../dtos/users.dto";
import Model from "./model";
import { getUsersInfo } from "../assets/UsersAssets/getUsersInfo";
import { params } from "../types/models.types";
import { validate } from "../assets/validation/validate";
import { getUserInfo } from "../assets/UsersAssets/getUserInfo";

class User extends Model {
  constructor() {
    super("users");
  }

  public getAllUsers(): Promise<user_output[]> {
    return new Promise((resolve, reject) => {
      this.read()
        .then((result) => {
          resolve(getUsersInfo(result));
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public getUserByParam(params: params): Promise<user_output| {}> {
    return new Promise((resolve, reject) => {
      this.readByParams(params)
        .then((result) => {
          if (result) {
            resolve(getUserInfo(result || {}));
          } else {
            resolve({})
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public register(rejester_data: user_input): Promise<string> {
    const emptyProperty = validate(rejester_data);
    return new Promise((resolve, reject) => {
      if (emptyProperty.length > 0) {
        reject(`${emptyProperty} is required`);
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
  public login(login_data: user_login): Promise<user_token> {
    const { email, password } = login_data;
    return new Promise((resolve, reject) => {
      this.readByParams({ email })
        .then((res) => {
          if (!res) {
            reject("email is not found");
          }
          return res as user;
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
          console.log(e);
          reject("email is not found");
        });
    });
  }

  public updateUser(user: user_input, params: params): Promise<string> {
    const { id } = params;
    return new Promise((resolve, reject) => {
      this.getUserByParam({ id: id })
        .then((res) => {
          if (!res) {
            reject(`user number ${id} is not found`);
          } else {
            return res as user;
          }
        })
        .then((res) => {
          const hashedPassword = bcrypt.hashSync(user.password, 10);
          this.update(
            {
              ...user,
              password: hashedPassword || res?.password,
              image: user.image || res?.image,
            },
            { id: id }
          )
            .then(() => {
              resolve(`user number ${id} is updated successfully`);
            })
            .catch(() =>
              reject(`user number ${id} did not update successfully`)
            );
        })
        .catch((e) => {
          reject(`user number ${id} is not found`);
        });
    });
  }

  public deleteUser(params: params): Promise<string> {
    const { id } = params;
    return new Promise((resolve, reject) => {
      this.getUserByParam({ id })
        .then((res) => {
          if (!res) {
            reject(`user number ${id} is not found`);
          }
          return res as user;
        })
        .then(() => {
          this.delete({ id })
            .then(() => {
              resolve(`user number ${id} is deleted successfully`);
            })
            .catch(() =>
              reject(`user number ${id} did not delete successfully`)
            );
        })
        .catch(() => {
          reject(`user number ${id} is not found`);
        });
    });
  }
}

export default User;
