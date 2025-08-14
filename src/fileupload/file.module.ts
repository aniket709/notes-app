import { Global ,Module} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { MulterModule } from "@nestjs/platform-express";

@Global()

@Module({
 imports:[MulterModule.register({
    dest:"./uploads"
 })],
    providers:[FileService],
    controllers:[FileController]
})

export class FileModule{}