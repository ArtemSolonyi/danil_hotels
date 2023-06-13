import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateHotelDto} from './dto/create-hotel.dto';
import {UpdateHotelDto} from './dto/update-hotel.dto';
import {Repository} from "typeorm";
import {Hotel} from "./entities/hotel.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RentHotel} from "./entities/rent-hotel.entity";

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel) private hotelRepository: Repository<Hotel>,
        @InjectRepository(RentHotel) private rentHotelRepository: Repository<RentHotel>,
    ) {
    }

    async create(body: CreateHotelDto, userId: number, file: Express.Multer.File) {
        const hotel = this.hotelRepository.create(body);
        return await this.hotelRepository.save({...hotel, userId, image: file.originalname})
    }

    async createRent(hotelId, userId) {
        const findRentHotel = await this.rentHotelRepository.findOne({where: {hotelId}})
        if (findRentHotel) throw new BadRequestException('Relations Already exist')
        return await this.rentHotelRepository.save({hotelId, userId})
    }

    async getALlRent(userId: number) {
        console.log(userId,'userId')
        return await this.hotelRepository
            .createQueryBuilder('Hotel')
            .leftJoinAndSelect('Hotel.rent','rent')
            .andWhere('rent.userId =:userId',{userId})

            .getMany()
    }

    async findAll() {
        return await this.hotelRepository
            .createQueryBuilder('Hotel')
            .leftJoinAndSelect('Hotel.rent','rent')
            .where('Hotel.isBanned = 0')
            .getMany()
    }


    async findOne(id: number, userId: number): Promise<NotFoundException | Hotel> {
        const hotel = await this.hotelRepository.findOne({where: {id: id, userId}})
        if (hotel) {
            return hotel
        } else {
            throw new NotFoundException()
        }

    }

    async update(body: UpdateHotelDto, userId: number) {
        const candidateHotel = await this.hotelRepository.findOne({where: {id: body.id, userId}})
        if (!candidateHotel) {
            throw new NotFoundException()
        }
        await this.hotelRepository.update({id: candidateHotel.id}, body)
        return await this.hotelRepository.findOne({where: {id: candidateHotel.id}})
    }

    async remove(id: number, userId: number) {
        const candidateHotel = await this.hotelRepository.findOne({where: {id: id, userId}})
        if (candidateHotel) {
            await this.hotelRepository.update({id},{isBanned:true})
            return {message: "Successfully delete"}
        } else {
            throw new NotFoundException()
        }
    }
}
