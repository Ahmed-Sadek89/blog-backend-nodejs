"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_controllers_1 = require("../controllers/posts.controllers");
const multerUpload_1 = require("../config/multerUpload");
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
const router = (0, express_1.Router)();
// get all latest posts {{updated_at}}
router.get('/getlatestPosts', posts_controllers_1.getLatestPosts);
// get all latest posts by cat_id {{updated_at, cat_id}} 
router.get('/getlatestPosts/:categoryId', posts_controllers_1.getLatestPostByCategory);
// get post by {{post id}}
router.get('/:id', posts_controllers_1.getPostByPostId);
// {{those routes must have a token}}
router.use(verifyToken_middleware_1.verifyToken);
// delete post
router.delete('/:id', posts_controllers_1.deletePostById);
router.use(multerUpload_1.postsUpload.single('image'));
// insert new post
router.post('/addNewPost', posts_controllers_1.addNewPost);
// update post -> title, description, image, category_id
router.put('/:id', posts_controllers_1.updatePostById);
exports.default = router;
