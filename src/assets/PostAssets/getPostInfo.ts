import { post_output } from "../../dtos/posts.dto";
import { getPosts } from "./getPosts";

export function getPostInfo(data: []): post_output {
    return getPosts(data)[0]
}
