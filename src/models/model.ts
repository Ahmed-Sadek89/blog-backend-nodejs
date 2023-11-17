import SQLPayload from "../assets/SQLAssets/SQLPayload";
import { getResultsBySelectAll } from "../assets/ModelsAssets/getResultsBySelectAll";
import { getResultsBySelectByParams } from "../assets/ModelsAssets/getResultsBySelectByParams";
import connection from "../config/database";
import { params } from "../types/models.types";

class Model {
  constructor(protected modelName: string) {}

  protected insert(values: params) {
    return new Promise((resolve, reject) => {
      const { command, params } = SQLPayload.generateInsertPayload(
        this.modelName,
        values
      );
      connection.query(command, [params], (error, data) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(data);
        }
      });
      connection.end((err) => {
        if (err) throw err;
        console.log("Connection closed.");
      });
    });
  }

  protected read() {
    return new Promise((resolve, reject) => {
      const command = `select * from ${this.modelName}`;
      connection.query(command, (error, data) => {
        if (error) {
          reject(error.message);
        } else {
          if (data.length > 0) {
            resolve(getResultsBySelectAll(data));
          } else {
            reject([]);
          }
        }
      });
      connection.end((err) => {
        if (err) throw err;
        console.log("Connection closed.");
      });
    });
  }

  protected readByParams(values: params) {
    return new Promise((resolve, reject) => {
      const { command, params } = SQLPayload.generateReadByParamsPayload(
        this.modelName,
        values
      );
      connection.query(command, [params], (error, data) => {
        if (error) {
          reject(error.message);
        } else {
          if (data.length > 0) {
            resolve(getResultsBySelectByParams(data));
          } else {
            resolve({});
          }
        }
      });
      connection.end((err) => {
        if (err) throw err;
        console.log("Connection closed.");
      });
    });
  }

  protected update(valuesSet: params, valuesWhere: params) {
    return new Promise((resolve, reject) => {
      let { command, paramsSet, paramsWhere } =
        SQLPayload.generateUpdatePaylaod(
          this.modelName,
          valuesSet,
          valuesWhere
        );
      connection.query(
        command,
        [...paramsSet, ...paramsWhere],
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
      connection.end((err) => {
        if (err) throw err;
        console.log("Connection closed.");
      });
    });
  }

  protected delete(values: params) {
    return new Promise((resolve, reject) => {
      const { command, params } = SQLPayload.generateDeletePayload(
        this.modelName,
        values
      );
      connection.query(command, [...params], (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
      connection.end((err) => {
        if (err) throw err;
        console.log("Connection closed.");
      });
    });
  }
}

export default Model;
