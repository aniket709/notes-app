import { Controller,Post,Req, UploadedFile, UseInterceptors,UploadedFiles, InternalServerErrorException, Get, UseGuards } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { extname } from 'path';
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "src/database/prisma.service";




@Controller("file")

export  class FileController{

    constructor(private fileService:FileService,
        private prisma :PrismaService){}


    @Post("/singleupload")
    @UseGuards(AuthGuard('jwt'))

    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            callback(null, Date.now() + extname(file.originalname));
          }
        })
      }))
     async uploadFile(@UploadedFile() file:Express.Multer.File,@Req() req){

        const userId = req.user?.id; 
        if (!file ) {
            throw new InternalServerErrorException('No files uploaded');
          }
          
        return this.fileService.uploadfile(file,userId)

      }

      @Post('/multiple')
      @UseGuards(AuthGuard('jwt'))
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
     
  
    

