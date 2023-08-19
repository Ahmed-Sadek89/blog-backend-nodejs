import multer from 'multer';


export const multerStorage = (folderName: string) => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, `src/uploads/${folderName}`);
        },
        filename: function(req, file, cb) {
          cb(null,  file.originalname);
        }
      });
    
    return storage
}

export const fileFilter = (
    _req: any, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
   
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}