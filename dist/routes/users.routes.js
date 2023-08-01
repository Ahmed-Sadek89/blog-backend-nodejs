"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
const b_parser = body_parser_1.default.urlencoded({ extended: true });
// GET/:ID -> GET BY ID
// GET -> GET ALL
// POST -> REGESTER
// POST -> LOGIN
// PUT -> UPDATE USER
// DELETE -> DELETE ONE
router.get('/getAllUsers', users_controller_1.getAllUsers);
router.get('/:id', users_controller_1.getuserById);
router.post('/rejester', b_parser, users_controller_1.rejester);
router.post('/login', b_parser, users_controller_1.login);
// router.put('/:id', b_parser, updateUserById)
exports.default = router;
