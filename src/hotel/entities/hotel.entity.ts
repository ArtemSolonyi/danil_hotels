import {Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

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
    @Column()
    userId:number
    @JoinTable({name:'userId',joinColumn:{foreignKeyConstraintName:'userId',referencedColumnName:'User',name:'User'}})
    @ManyToOne(()=>User,(user)=>user.id)
    user:User
}
