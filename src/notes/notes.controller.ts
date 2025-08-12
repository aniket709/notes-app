import { Controller,  ParseIntPipe, UseGuards } from "@nestjs/common";
import { Body,Post,Req,Patch,Param,Delete,Get } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NotesDto, updateNotes } from "./dto/notes.dto";
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "src/database/prisma.service";


@Controller("notes")
export class NotesController{

    constructor(private readonly notesService:NotesService,
      private prisma :PrismaService){}

      @UseGuards(AuthGuard('jwt'))
     @Post("/createnotes")
      /*-------------------------------------------------------------------------------- */
    async createNotes(@Body() data:NotesDto,@Req() req){

        const userId = req.user.id;
        console.log(req.user)
       return  this.notesService.addNotes(data,userId)

    }

  @UseGuards(AuthGuard('jwt'))
    @Patch("/updatenotes/:id")
     /*-------------------------------------------------------------------------------- */
    async updateNotes(@Body() data:updateNotes,@Req() req 
    , @Param('id',ParseIntPipe)id: number)
  :  Promise <object | null>{
    
    const userId= req.user.id
        return this.notesService.updateNotes(data,id,userId)

    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/deletenotes/:id")

     /*-------------------------------------------------------------------------------- */

    async deleteNotes(@Param('id',ParseIntPipe) id : number,@Req() req){

     const notesToDeleted= await this.prisma.notes.findUnique({where:{id}})
     if(!notesToDeleted){
      return({msg:"does not find the notesId"})
     }

     const loggedUser= req.user.id;

     console.log(loggedUser,notesToDeleted.userId)

     if (loggedUser!=notesToDeleted.userId){
      return ({msg:"u can not deleted other notes"})
     }

       return this.notesService.deleteNotes(loggedUser,id);

    }

     @UseGuards(AuthGuard('jwt'))
    @ Get("/latestdata")
        /*-------------------------------------------------------------------------------- */
    async latestUpdate(){
      return this.notesService.findLatestUpdate();

    }



}