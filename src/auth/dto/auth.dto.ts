
import { IsString, IsEmail, IsNotEmpty, Length, isNotEmpty } from 'class-validator';

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