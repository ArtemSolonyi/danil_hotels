import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Hotel} from "./hotel.entity";

@Entity()
export class RentHotel {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({type: 'int'})
    hotelId: number
    @Column({type: 'int'})
    userId: number
    @JoinTable({
        name: 'hotelId',
        joinColumn: {foreignKeyConstraintName: 'hotelId', referencedColumnName: "Hotel", name: 'Hotel'}
    })
    @ManyToOne(() => Hotel, (hotel) => hotel.id)
    hotel: Hotel
}