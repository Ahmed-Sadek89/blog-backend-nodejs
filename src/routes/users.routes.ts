import { Router } from "express";
import bodyParser from "body-parser";
import {getAllUsers, login, rejester} from '../controllers/users.controller'

const router= Router();
const b_parser = bodyParser.urlencoded({extended: true})

router.get('/getAllUsers', getAllUsers);

router.post('/rejester', b_parser, rejester);

router.post('/login', b_parser, login);

export default router