import { Injectable } from "@nestjs/common";
import { Express } from 'express'

@Injectable()

export class FileService{

       uploadfile(file : Express.Multer.File){

        return {
            message:"file uploaded successfully",
            fileName:file.filename,
            path:`/upload/${file.filename}`
        }

     }

     uploadMultiplefile(files:Express.Multer.File[]){
        return files.map(file => ({
            fileName: file.filename,
            path: `/uploads/${file.filename}`,
          }));
     }

}

