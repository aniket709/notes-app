
import { IsString, IsEmail, IsNotEmpty, Length} from 'class-validator';

export class signupDto{

  @IsNotEmpty()
  @IsString()
  @Length(3,8)
  username:string;

   @Length(6,20)
    @IsString()
    password : string;

      @IsEmail()
      @IsNotEmpty()
     email :  string
    
}

 export class LoginDto{

    @IsString()
    @IsNotEmpty()
    username:string


     @IsString()
     @IsNotEmpty()
     password:string


   @IsEmail()
   @IsNotEmpty()
   @IsString()
    email :string
 }

 export class getUser{
     
    @IsEmail()
    @IsNotEmpty()
    email:string
     

    @IsEmail()
    @IsNotEmpty()
    username:string
 }

  export class ForgetPasswordDto{

   @IsEmail()
   @IsNotEmpty()
   email:string
  }

  export class otpDto{

@IsNotEmpty()
    code:number
  }

  export class NewPasswordDto{

    @IsString()
    @IsNotEmpty()
    @Length(8,60)
    newPassword:string

    
    @IsNotEmpty()
    @IsEmail()
     email:string
  }