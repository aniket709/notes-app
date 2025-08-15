import { Global,Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CloudinaryProvider } from "./cloudinary.util";
import { EmailService } from "./nodemailer.util";

@Global()
@Module({
    imports:[ConfigModule],
    exports:[CloudinaryProvider,EmailService],
    providers:[CloudinaryProvider,EmailService]

})

export class UtilModule{}