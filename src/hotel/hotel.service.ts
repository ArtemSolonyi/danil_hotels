import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import {Repository} from "typeorm";
import {Hotel} from "./entities/hotel.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class HotelService {
  constructor(@InjectRepository(Hotel) private hotelRepository: Repository<Hotel>) {
  }

  async create(body: CreateHotelDto,userId:number,file: Express.Multer.File) {
    const hotel = this.hotelRepository.create(body);
    return await this.hotelRepository.save({...hotel,userId,image:file.originalname})
  }

  async findAll(userId:number) {
    return await this.hotelRepository.find({where:{userId:userId}});
  }

  async findOne(id: number,userId:number): Promise<NotFoundException | Hotel> {
    const hotel = await this.hotelRepository.findOne({where: {id: id,userId}})
    if (hotel) {
      return hotel
    } else {
      throw new NotFoundException()
    }

  }

  async update(body: UpdateHotelDto,userId:number) {
    const candidateHotel = await this.hotelRepository.findOne({where: {id: body.id,userId}})
    if (!candidateHotel) {
      throw new NotFoundException()
    }
    return await this.hotelRepository.save({...candidateHotel, ...body})
  }

  async remove(id: number,userId:number) {
    const candidateHotel = await this.hotelRepository.findOne({where: {id: id,userId}})
    if (candidateHotel) {
      await this.hotelRepository.delete({id})
      return {message: "Successfully delete"}
    } else {
      throw new NotFoundException()
    }
  }
}
