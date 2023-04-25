import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles, UploadedFile, BadRequestException, Res
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import {User, UserGuard} from "../../utils/auth-guard-jwt";
import {FileInterceptor} from "@nestjs/platform-express";
import {multerInterceptor} from "../../utils/multer-interceptor";
import * as path from 'path'
import {Response} from'express'

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}
  @UseGuards(UserGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image',multerInterceptor))
  create(@UploadedFile() file: Express.Multer.File,@Body() createHotelDto: CreateHotelDto,@User() userId:number) {
    return this.hotelService.create(createHotelDto,userId,file)
  }
  @Get('/image/:image')
  image(@Param('image') image:string,@Res() res:Response){
    return res.sendFile(path.join(__dirname,"../../files").replace('/dist','')+"/"+image)
  }
  @UseGuards(UserGuard)
  @Get('/rents')
  getRentsAll(@User() userId:number){
    return this.hotelService.getALlRent(userId);
  }
  @UseGuards(UserGuard)
  @Get()
  findAll(@User() userId:number) {
    return this.hotelService.findAll();
  }
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string,@User() userId:number) {
    return this.hotelService.findOne(+id,userId);
  }
  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateHotelDto: UpdateHotelDto,@User() userId:number) {
    return this.hotelService.update({...updateHotelDto,id:+id},userId);
  }
  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@User() userId:number) {
    return this.hotelService.remove(+id,userId);
  }
  @UseGuards(UserGuard)
  @Patch('rent/:id')
  rent(@User() userId:number,@Param('id') id){
    return this.hotelService.createRent(+id,userId);
  }


}
