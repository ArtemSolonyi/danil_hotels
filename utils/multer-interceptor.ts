import * as multer from "multer";

export const multerInterceptor = {dest:'./files', storage:multer.diskStorage(
        {
            destination: './files',
            filename: function ( req, file, cb ) {
                //req.body is empty... here is where req.body.new_file_name doesn't exists
                cb( null, file.originalname );
            }
        }
    )}