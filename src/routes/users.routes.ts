import { Router } from "express";
import bodyParser from "body-parser";
import { getAllUsers, login, rejester, getuserById, updateUserById, deleteUserById } from '../controllers/users.controller'
import { verifyToken } from "../middleware/verifyToken.middleware";

const router = Router();
const b_parser = bodyParser.urlencoded({ extended: true })

// JWT
// Multer

router.post('/rejester', b_parser, rejester);
router.post('/login', b_parser, login);

router.use(verifyToken) // middleware

router.get('/getAllUsers', getAllUsers);
router.get('/:id', getuserById)
router.put('/:id', b_parser, updateUserById)
router.delete('/:id', deleteUserById)


export default router