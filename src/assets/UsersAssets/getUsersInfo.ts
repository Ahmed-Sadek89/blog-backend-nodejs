import { users_info } from "../../dtos/users.dto";
import { getImageLink } from "../ModelsAssets/getImageLink";

export function getUsersInfo(result: any): users_info[] {
  let data: users_info[] = [];
  result.map((index: users_info) => {
    let { password, ...others } = index;
    const user_image = getImageLink(index.image, "users");
    data.push({ ...others, image: user_image });
  });
  return data;
}
