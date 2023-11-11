"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostCommand = void 0;
function getPostCommand() {
    const command = `select 
    posts.id, posts.title, posts.description, posts.post_image, posts.created_at as published_at,
    categories.id as cat_id, categories.cat_name, 
    users.username, users.email, users.image 
from posts
inner join categories on posts.category_id=categories.id
inner join users on posts.user_id=users.id`;
    return command;
}
exports.getPostCommand = getPostCommand;
