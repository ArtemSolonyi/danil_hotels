import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {RentHotel} from "./rent-hotel.entity";

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn('increment')
    id:number
    @Column({default:null,type:'varchar',length:255})
    title:string
    @Column({default:null,type:'varchar',length:255})
    description:string
    @Column({default:null,type:'int'})
    price:number
    @Column({default:''})
    image:string
    @Column({default:'0'})
    isBanned:boolean
    @Column()
    userId:number
    @JoinTable({name:'userId',joinColumn:{foreignKeyConstraintName:'userId',referencedColumnName:'User',name:'User'}})
    @ManyToOne(()=>User,(user)=>user.id)
    user:User
    @OneToMany(()=>RentHotel,(rentHotel)=>rentHotel.hotel)
    rent:RentHotel
}
