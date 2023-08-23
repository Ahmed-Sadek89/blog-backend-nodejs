import multer from "multer";
import { fileFilter, multerStorage } from "../config/multer"

const usersStorage = multerStorage('posts')
export const usersUpload = multer({
    storage: usersStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});