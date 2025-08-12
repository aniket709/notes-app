import { Controller, Post,Body, Get, UseGuards} from "@nestjs/common";
import { LoginDto, getUser, signupDto } from "./dto/auth.dto";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";




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

async loginUser(@Body() LoginDto) :Promise <object | null>{
    return this.userService.login(LoginDto)

}

 /*-------------------------------------------------------------------------------- */

@Get("/alluser")
@UseGuards(AuthGuard('jwt') )

async allUser() :Promise <object | null>{

    return this.userService.getUser()

}

}





