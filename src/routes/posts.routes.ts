import { Router } from "express";
import { addNewPost, deletePostById, getLatestPostByCategory, getLatestPosts, getPostByPostId, updatePostById } from "../controllers/posts.controllers";
import { postsUpload } from "../config/multerUpload";
import { verifyToken } from "../middleware/verifyToken.middleware";

const router = Router();

// get all latest posts {{updated_at}}
router.get('/getlatestPosts', getLatestPosts) 
// get all latest posts by cat_id {{updated_at, cat_id}} 
router.get('/getlatestPosts/:categoryId', getLatestPostByCategory) 
// get post by {{post id}}
router.get('/:id', getPostByPostId) 

// {{those routes must have a token}}
router.use(verifyToken)
// delete post
router.delete('/:id', deletePostById);

router.use( postsUpload.single('post_image'))
// insert new post
router.post('/addNewPost', addNewPost);
// update post -> title, description, image, category_id
router.put('/:id', updatePostById);


export default router;