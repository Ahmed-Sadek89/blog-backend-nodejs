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
            reject({});
          }
        }
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
    });
  }
}

export default Model;
