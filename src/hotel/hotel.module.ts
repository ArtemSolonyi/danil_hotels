import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Hotel} from "./entities/hotel.entity";
import {JwtModule} from "@nestjs/jwt";
@Module({
  imports:[TypeOrmModule.forFeature([Hotel]),JwtModule],
  controllers: [HotelController],
  providers: [HotelService]
})
export class HotelModule {}
