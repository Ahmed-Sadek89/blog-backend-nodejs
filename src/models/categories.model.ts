import { category, category_input } from "../dtos/category.dto";
import { params } from "../types/models.types";
import Model from "./model";

class Categories extends Model {
  constructor() {
    super("categories");
  }

  public addNewCategory(category: category_input): Promise<string> {
    const { cat_name } = category;
    return new Promise((resolve, reject) => {
      this.insert({ cat_name })
        .then(() => resolve(cat_name))
        .catch((error) => reject(error));
    });
  }

  public getAllCategories(): Promise<category[]> {
    return new Promise((resolve, reject) => {
      this.read()
        .then((result) => resolve(result as category[]))
        .catch((error) => reject(error));
    });
  }

  public getCategoryById(params: params): Promise<category> {
    const { id } = params;
    return new Promise((resolve, reject) => {
      this.readByParams({ id })
        .then((result) => resolve(result as category))
        .catch(() => reject(`no catgory has id ${id}`));
    });
  }

  public deleteCategoryById(params: params): Promise<string> {
    const { id } = params;
    return new Promise((resolve, reject) => {
      this.readByParams({ id })
        .then((res) => {
          if (!res) {
            reject(`category number ${id} is not found`);
          }
          return res as category;
        })
        .then(() => {
          this.delete({ id })
            .then(() => {
              resolve(`category number ${id} is deleted successfully`);
            })
            .catch(() =>
              reject(`category number ${id} did not delete successfully`)
            );
        })
        .catch(() => {
          reject(`category number ${id} is not found`);
        });
    });
  }

  public updateCategoryById(
    body: category_input,
    params: params
  ): Promise<string> {
    const { cat_name } = body;
    const { id } = params;
    return new Promise((resolve, reject) => {
      this.readByParams({ id })
        .then((res) => {
          if (!res) {
            reject(`category number ${id} is not found`);
          }
          return res as category;
        })
        .then(async (res) => {
          await this.update(
            {
              cat_name: cat_name || res.cat_name,
            },
            { id }
          )
            .then(() => {
              resolve(`category number ${id} is updated successfully`);
            })
            .catch(() =>
              reject(`category number ${id} did not update successfully`)
            );
        })
        .catch(() => {
          reject(`category number ${id} is not found`);
        });
    });
  }
}

export default Categories;
