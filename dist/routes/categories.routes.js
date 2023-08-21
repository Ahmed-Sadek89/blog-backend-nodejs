"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
const categories_controller_1 = require("../controllers/categories.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const b_parser = body_parser_1.default.urlencoded({ extended: true });
const router = (0, express_1.Router)();
router.get('/getAllCategories', categories_controller_1.getAllCategories);
router.use(verifyToken_middleware_1.verifyToken);
router.get('/:id', categories_controller_1.getCategoryById);
router.delete('/:id', categories_controller_1.deleteCategoryById);
router.use(b_parser);
router.post('/addNewCategory', categories_controller_1.addNewCategory);
router.put('/:id', categories_controller_1.updateCategoryById);
exports.default = router;
