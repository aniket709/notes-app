import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import *  as bcrypt from "bcrypt"
import { LoginDto, getUser, signupDto } from "./dto/auth.dto";
import { ConfigModule } from "@nestjs/config";
import { throwError } from "rxjs";
import * as jwt from "jsonwebtoken"
import { ConfigService } from "@nestjs/config";


 @Injectable()
 export class UserService {

    constructor(private prisma : PrismaService,
        private configService :ConfigService){}


         /*-------------------------------------------------------------------------------- */

    async signup(data:signupDto) :Promise<object | null> {

    const user= await this.prisma.user.findUnique({
        where :{
          email:data.email
        }
    })
    if (user){
        return ({msg : "user already registered"});
    }

    const hashedpassword = await bcrypt.hash(data.password,10);

   const newUser=  await this.prisma.user.create({
     
    data:{
         email : data.email,
         username:data.username,
         password:hashedpassword
     }
        
    })
    return({
        msg : "usercreated successfully",
        email: newUser.email,
        username: newUser.username
    })
    }
 /*-------------------------------------------------------------------------------- */
    async login (data:LoginDto): Promise<object | null>{

       const registered= await this.prisma.user.findUnique({
            where :{
                email : data.email
            }
        })

        if (!registered){
           throw Error("email is not registered")
        }
        const matchedPassword = await bcrypt.compare(data.password,registered.password)

        if (!matchedPassword){
            throw Error("password does not matched")
        }

        const token = jwt.sign(

            {
                id: registered.id, 
              },
              this. configService.get<string>('SECRET_KEY')||"smdbcd",
              {
                expiresIn: this.configService.get<string>('EXPIRES_IN'), 
              },
            );
      
        return ({
            msg:"user login successfully",
            token
            
        })  
    }

     /*-------------------------------------------------------------------------------- */

    async getUser():Promise<object| null>{

        return await this.prisma.user.findMany({

            select:{
                id: true,

                username:true,

                email:true
            }
        })
        }
    }


