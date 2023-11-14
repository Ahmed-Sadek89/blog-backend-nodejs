import { post_output } from "../../dtos/posts.dto";
import { getImageLink } from "../ModelsAssets/getImageLink";

export function getPosts(data: []): post_output[] {
    let modifiedData: post_output[] = [];
    data.map((index: any) => {
      let { cat_id, cat_name, username, email, image, ...others } =
        index;
      const post_image = getImageLink(index.post_image, "posts");
      const user_image = getImageLink(image, "users");
      modifiedData.push({
        ...others,
        post_image,
        category: {
          cat_id,
          cat_name,
        },
        user: {
          username,
          email,
          image: user_image,
        },
      });
    });
    return modifiedData
}
