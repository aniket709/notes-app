import { Global, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Global()

@Module({
    imports: [
      PassportModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          secret: config.get<string>('SECRET_KEY'),
          signOptions: { expiresIn: config.get<string>('EXPIRES_IN') },
        }),
      }),
    ],
    providers: [UserService, JwtStrategy],
    exports: [UserService],
    controllers: [UserController],
  })

export class UserModule{}
