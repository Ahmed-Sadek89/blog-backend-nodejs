import { user, user_output } from "../../dtos/users.dto";
import { getImageLink } from "../ModelsAssets/getImageLink";

export function getUsersInfo(result: user[] | unknown): user_output[] {
  let data: user_output[] = [];
  let res = result as user[];
  res.map((index: user) => {
    let { password, ...others } = index;
    const user_image = getImageLink(index.image, "users");
    data.push({ ...others, image: user_image });
  });
  return data;
}
