import {Column} from "typeorm";

export class CreateHotelDto {
    title:string
    description:string
    price:number
    image:string
}
