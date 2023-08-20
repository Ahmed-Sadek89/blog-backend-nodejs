import { Router } from "express";
import bodyParser from "body-parser";
import { getAllUsers, login, rejester, getuserById, updateUserById, deleteUserById } from '../controllers/users.controller'
import { verifyToken } from "../middleware/verifyToken.middleware";
import { usersUpload } from "../config/multerUpload";

const router = Router();
const b_parser = bodyParser.urlencoded({ extended: true })


router.post('/rejester',  usersUpload.single('image'), rejester);
router.post('/login', b_parser, login);

router.use(verifyToken) // middleware

router.get('/getAllUsers', getAllUsers);
router.get('/:id', getuserById)
router.put('/:id', usersUpload.single('image'), updateUserById)
router.delete('/:id', deleteUserById)


export default router