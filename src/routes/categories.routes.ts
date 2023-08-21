import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.middleware";
import { addNewCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategoryById } from "../controllers/categories.controller";
import bodyParser from "body-parser";

const b_parser = bodyParser.urlencoded({ extended: true })
const router = Router();

router.get('/getAllCategories', getAllCategories)

router.use(verifyToken)
router.get('/:id', getCategoryById)
router.delete('/:id', deleteCategoryById)

router.use(b_parser)
router.post('/addNewCategory', addNewCategory)
router.put('/:id', updateCategoryById)

export default router