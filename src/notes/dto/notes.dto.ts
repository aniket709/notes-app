import { IsEmail, IsNotEmpty, IsString ,IsOptional} from "class-validator";



export class NotesDto{


    @IsString()
    @IsNotEmpty()
    title:string


     @IsString()
     @IsNotEmpty()
     content:string
     

}

export class updateNotes{

    @IsOptional()
    @IsString()
    title?:string
       
  
    @IsOptional()
    @IsString()
    content?:string


    @IsOptional()
    @IsString()
    email?:string 
}

export class deleteNotes{

    

}