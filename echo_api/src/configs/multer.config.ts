import { diskStorage } from "multer";
import { Request } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer upload options
export const multerOptions = {
    // Enable file size limits
    limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${file.originalname}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: process.env.UPLOAD_LOCATION,
        // File modification details
        filename: (req: Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) => { return cb(null, file.originalname); },
    }),
};