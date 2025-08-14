import { Injectable,Inject  } from "@nestjs/common";
import { v2 as Cloudinary } from 'cloudinary';
import * as fs from 'fs';

import { PrismaService } from "src/database/prisma.service";


@Injectable()

export class FileService{

    constructor(@Inject('CLOUDINARY') private cloudinary: typeof Cloudinary,
    private prisma:PrismaService) {}

       async uploadfile(file : Express.Multer.File,userId:number){
        
        const result = await Cloudinary.uploader.upload(file.path,{
            folder:"uploads"
        })
        
        if (!result){
            console.log("some thing wrong with the folder")
        }
        console.log(file)
        console.log(file.path)
        fs.unlinkSync(file.path);

        const metaData= await this.prisma.metaData.create({
            data:{
                url:result.secure_url,
                public_id :result.public_id,
                user: { connect: { id: userId } }
            }
        })

        return {
            url :result.secure_url,
            public_id:result.public_id,
            msg :"meta data ",
            metaData
            
        }
       
     }

     async uploadMultiplefile(files: Express.Multer.File[]) {
        const uploadPromises = files.map((file) =>
          Cloudinary.uploader.upload(file.path, {
            folder: 'uploads',
          }),
        );
    
        const results = await Promise.all(uploadPromises);

        files.forEach((file) => fs.unlinkSync(file.path)); 

        return results.map((res) => ({
          url: res.secure_url,
          public_id: res.public_id,
        }));
      }
    }

 



