import { Router } from "express";
import bodyParser from "body-parser";
import { getAllUsers, login, rejester, getuserById } from '../controllers/users.controller'

const router = Router();
const b_parser = bodyParser.urlencoded({ extended: true })
// GET/:ID -> GET BY ID
// GET -> GET ALL
// POST -> REGESTER
// POST -> LOGIN

// PUT -> UPDATE USER
// DELETE -> DELETE ONE
router.get('/getAllUsers', getAllUsers);

router.get('/:id', getuserById)

router.post('/rejester', b_parser, rejester);

router.post('/login', b_parser, login);

// router.put('/:id', b_parser, updateUserById)

export default router