import { Global,Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CloudinaryProvider } from "./cloudinary.util";

@Global()
@Module({
    imports:[ConfigModule],
    exports:[CloudinaryProvider],
    providers:[CloudinaryProvider]

})

export class UtilModule{}