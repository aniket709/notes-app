import { Injectable } from "@nestjs/common";
import { Prisma } from '@prisma/client';
import { PrismaService } from "src/database/prisma.service";
import { NotesDto, updateNotes } from "./dto/notes.dto";


@Injectable()

export class NotesService{

    constructor(private prisma:PrismaService){}
      /*-------------------------------------------------------------------------------- */
 
    async addNotes(notes:NotesDto,userId:number){

        const createdNote=await this.prisma.notes.create({
            data:{
                title:notes.title,
                content:notes.content,
                  user:{
                    connect:{
                        id:userId
                    }
                  }
            }
        })
        return ({
            msg : "notes created successfully",
            createdNote
        })
    }
      /*-------------------------------------------------------------------------------- */

    async updateNotes(data:updateNotes,userId:number,noteId:number){

        const existingNotes= await this.prisma.notes.findFirst({
            where:{
                id: noteId,
                userId: userId
               
            }
        })
        if (!existingNotes || existingNotes.userId !== userId){
            return({msg :"user is not there "})
        }

         const updatedtNotes= await this.prisma.notes.update({
            where:{
                id:noteId ,
            },
            data:{
             title:data.title,
             content:data.content
            }
         })

       return ({
            msg : "user successfull updated",
            updatedtNotes
         })

    }
         /*-------------------------------------------------------------------------------- */
    async deleteNotes( userId:number,notesId:number){

      const userWithNotesId=  await this.prisma.notes.findFirst({
            where:{
              id:notesId,
              userId:userId
            }
        })
        if (!userWithNotesId){
            return({msg:"you can not delete someone else notes"});
        }
        
        await this.prisma.notes.delete({
            where:{
                id:notesId
            }
        })
        return ({msg:"notes deleted successfully",
                  notesId})

    }
      /*-------------------------------------------------------------------------------- */

    async findLatestUpdate() {
        return await this.prisma.notes.findFirst({
          orderBy: {
            updatedAt: Prisma.SortOrder.desc
          }
        });
      }

       /*-------------------------------------------------------------------------------- */

     








}