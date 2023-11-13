import { user_output, user } from "../../dtos/users.dto";
import { getImageLink } from "../ModelsAssets/getImageLink";

export function getUserInfo(result: user | {}): user_output | {} {
    const { password, image, ...others } = result as user;
    const user_image = getImageLink(image, "users");
    return { ...others, image: user_image } ;
}
