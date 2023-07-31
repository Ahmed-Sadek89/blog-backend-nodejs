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
router.get('/getAllUsers', users_controller_1.getAllUsers);
router.post('/rejester', b_parser, users_controller_1.rejester);
router.post('/login', b_parser, users_controller_1.login);
exports.default = router;
