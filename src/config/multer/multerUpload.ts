import multer from "multer";
import { fileFilter, multerStorage } from "../multer";

const usersStorage = multerStorage('users')
export const usersUpload = multer({
    storage: usersStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});