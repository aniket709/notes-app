import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './auth/user.module';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { FileModule } from './fileupload/file.module';
import { UtilModule } from './utils/utils.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),
    PrismaModule,UserModule,NotesModule,FileModule,UtilModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
