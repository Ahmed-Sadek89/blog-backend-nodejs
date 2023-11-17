import { getPostInfo } from "../assets/PostAssets/getPostInfo";
import { getPosts } from "../assets/PostAssets/getPosts";
import { getPostCommand } from "../assets/PostAssets/postCommand";
import { validate } from "../assets/validation/validate";
import connection from "../config/database";
import { post, post_input, post_output } from "../dtos/posts.dto";
import { params } from "../types/models.types";
import Model from "./model";
import * as dotEnv from "dotenv";
dotEnv.config();

class Posts extends Model {
  static command: string;
  constructor() {
    super("posts");
    Posts.command = getPostCommand();
  }

  public addNewPost(post: post_input): Promise<string> {
    const emptyProperties = validate(post);
    return new Promise((resolve, reject) => {
      if (emptyProperties.length > 0) {
        reject(`proprety ${emptyProperties} is requried`);
      }
      this.insert({ ...post })
        .then(() => {
          resolve(`new post inserted successfully`);
        })
        .catch(() => {
          reject(`new post did not insert!`);
        });
    });
  }

  public updatePostById(body: params, params: params) {
    const { id } = params;
    return new Promise((resolve, reject) => {
      this.readByParams({ id })
        .then((res) => {
          return res as post;
        })
        .then((res) => {
          this.update(
            { ...body, post_image: body.post_image || res.post_image },
            { id }
          )
            .then(() => {
              resolve(`post number ${id} updated successfully`);
            })
            .catch((e) => {
              reject(`post number ${id} did not update!`);
            });
        })
        .catch((e) => {
          reject(`post number ${id} is not found!`);
        });
    });
  }

  public deletePostById(params: params): Promise<string> {
    const { id } = params;
    return new Promise((resolve, reject) => {
      this.delete({ id })
        .then(() => {
          resolve(`post number ${id} deleted successfully`);
        })
        .catch(() => {
          reject(`post number ${id} did not delete!`);
        });
    });
  }

  public getPostByPostId(params: params): Promise<post_output> {
    const { id } = params;
    return new Promise((resolve, reject) => {
      connection.query(
        `${Posts.command} where posts.id=${id}`,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            if (data.length > 0) {
              resolve(getPostInfo(data));
            }
          }
        }
      );
    });
  }

  public getLatestPosts(): Promise<post_output[]> {
    return new Promise((resolve, reject) => {
      connection.query(
        `${Posts.command} order by posts.created_at desc`,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            if (data.length > 0) {
              resolve(getPosts(data));
            } else {
              resolve([]);
            }
          }
        }
      );
    });
  }

  public getLatestPostByCategory(params: params): Promise<post_output[]> {
    let { categoryId } = params;
    return new Promise((resolve, reject) => {
      connection.query(
        `${Posts.command} where posts.category_id=${categoryId} order by posts.created_at desc`,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            if (data.length > 0) {
              resolve(getPosts(data));
            } else {
              resolve([]);
            }
          }
        }
      );
    });
  }
}
export default Posts;
