import { Controller, Post,Body, Get, UseGuards, Req} from "@nestjs/common";
import { ForgetPasswordDto, LoginDto, NewPasswordDto, getUser, signupDto } from "./dto/auth.dto";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { verify } from "crypto";




@Controller("user")

export  class UserController{

    constructor(private readonly userService:UserService){}

   /*-------------------------------------------------------------------------------- */

@Post("/createuser")

async registerUser(@Body ()  signupDto) :Promise <object | null>{

    return this.userService.signup(signupDto)
    
}
 /*-------------------------------------------------------------------------------- */

@Post("/login")

async loginUser(@Body() LoginDto, @Req()req) :Promise <object | null>{

    return this.userService.login(LoginDto)
}

 /*-------------------------------------------------------------------------------- */

@Get("/alluser")
@UseGuards(AuthGuard('jwt') )

async allUser() :Promise <object | null>{

    return this.userService.getUser()

}

 /*-------------------------------------------------------------------------------- */

 @Post("/forgetpassword")
 async forgetPassword(@Body() data : ForgetPasswordDto){
    
    return this.userService.forgetPassword(data);
 }
  /*-------------------------------------------------------------------------------- */

 @Post("/verifyotp")
 async verifyOtp(@Body() otpDto:{code:number}){

    return this.userService.verifyOtp(otpDto)

 }
 /*-------------------------------------------------------------------------------- */
 @Post("/setpassword")
 async setPassword(@Body()data:NewPasswordDto){
    return this.userService.setNewPassword(data)
 }


}





