import {Hotel} from "./src/hotel/entities/hotel.entity";
import {User} from "./src/user/entities/user.entity";
import * as dotenv from "dotenv"
import {RentHotel} from "./src/hotel/entities/rent-hotel.entity";
dotenv.config()
export const typeSettingsMySql1: any = {
    type: process.env.DB_TYPE,
    database: process.env.DB_DATABASE1,
    entities: [User,Hotel,RentHotel],
    logging:true,
    synchronize: true,
    //migrations: ['./src/migrations'],
    migrations: ['dist/migrations/*.js'],
    //migrations: ['./src/migrations'],
    migrationsTableName: 'migrations',
}