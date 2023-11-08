"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const users_controller_1 = require("../controllers/users.controller");
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
const multerUpload_1 = require("../config/multerUpload");
const router = (0, express_1.Router)();
const b_parser = body_parser_1.default.urlencoded({ extended: true });
router.post("/rejester", multerUpload_1.usersUpload.single("image"), users_controller_1.rejester);
router.post("/login", b_parser, users_controller_1.login);
router.use(verifyToken_middleware_1.verifyToken); // middleware
router.get("/getAllUsers", users_controller_1.getAllUsers);
router.get("/:id", users_controller_1.getuserById);
router.put("/:id", multerUpload_1.usersUpload.single("image"), users_controller_1.updateUserById);
router.delete("/:id", users_controller_1.deleteUserById);
exports.default = router;
