import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ForgetPasswordDto, LoginDto, NewPasswordDto, getUser, signupDto } from "./dto/auth.dto";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { ConfigService } from "@nestjs/config";
import {EmailService}from "src/utils/nodemailer.util"



 @Injectable()
 export class UserService {

    constructor(private prisma : PrismaService,
        private configService :ConfigService,
        private emailService:EmailService){}


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
          /*-------------------------------------------------------------------------------- */
        async forgetPassword(enterEmail:ForgetPasswordDto){
            
            const sameRegisteredEmail = await  this.prisma.user.findUnique({
                where:{
                    email:enterEmail.email
                }
            })
            if (!sameRegisteredEmail){

                throw new BadRequestException ("enter the registerd email")
            }

            function generateOTP() {
                return Math.floor(100000 + Math.random() * 900000);
              }

              const otp = generateOTP();

              await this.prisma.otp.create({
                data: {
                  email: enterEmail.email,
                  code: otp,
                  expiresAt: new Date(Date.now() + 5 * 60 * 1000) 
                }
              });
              await this.emailService.sendOTPEmail(sameRegisteredEmail.email,otp);

              return ({
                msg:"email send successfully",

              })
        }
          /*-------------------------------------------------------------------------------- */

        async verifyOtp(otpDto: { code: number }) {
            const otpRecord = await this.prisma.otp.findUnique({
              where: { code: otpDto.code }
            });

            if(!otpRecord){
              return({
                msg:"can not find the otpRecord"
              })
            }

            if (otpRecord.expiresAt < new Date()) {
                throw new BadRequestException('OTP has expired');
              }

              
              await this.prisma.otp.delete({
                where: { code: otpDto.code }
              });
              
              return({
                
                msg:"otp deleted  after the verification successfully"
              })

        }
          /*-------------------------------------------------------------------------------- */
        
        async setNewPassword(data:NewPasswordDto){{
            
            const user = await this.prisma.user.findUnique({
                where: { email: data.email },
              });
            
              if (!user) {
                throw new BadRequestException('User not found');
              }
            
              if (!user.isOtpVerified) {
                return { msg: 'OTP is not verified' };
              }
           
            const hashed = await bcrypt.hash(data.newPassword,10)
            if (!hashed){
                return({
                    msg:"enter new password"
                })
            }
            await this.prisma.user.update({
                where:{
                    email:data.email
                },
                data:{
                    password:hashed
                }
            })
            return { msg: 'Password updated successfully' };

        }
    }
}


