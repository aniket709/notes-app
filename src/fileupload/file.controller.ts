import { Controller,Post, UploadedFile, UseInterceptors,UploadedFiles, InternalServerErrorException, Get } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { extname } from 'path';




@Controller("file")

export  class FileController{

    constructor(private fileService:FileService){}


    @Post("/singleupload")

    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            callback(null, Date.now() + extname(file.originalname));
          }
        })
      }))
      uploadFile(@UploadedFile() file:Express.Multer.File){
        if (!file ) {
            throw new InternalServerErrorException('No files uploaded');
          }
        return this.fileService.uploadfile(file)

      }

      @Post('/multiple')
      @UseInterceptors(FilesInterceptor('files', 5, {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            callback(null, Date.now() + extname(file.originalname));
          }
        })
      }))
      uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new InternalServerErrorException('No files uploaded');
          }
        return this.fileService.uploadMultiplefile(files);
      }
    }
     
  
    

