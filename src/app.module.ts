import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HotelModule} from './hotel/hotel.module';
import {User} from "./user/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {typeSettingsMySql1} from "../config";
import {UserModule} from "./user/user.module";
import {Hotel} from "./hotel/entities/hotel.entity";
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [HotelModule, UserModule,
        MulterModule.register({
            dest: './files',
        }),
        TypeOrmModule.forRoot(typeSettingsMySql1),
        TypeOrmModule.forFeature([User, Hotel]),
        ConfigModule.forRoot({
            isGlobal: true
        }),],
    controllers: [AppController],
    providers: [AppService],

})
export class AppModule {
}
