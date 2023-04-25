import {Column, PrimaryGeneratedColumn, Entity} from "typeorm"


@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({unique:true})
    email: string
    @Column({select: false})
    password: string
    @Column({nullable:true})
    firstName: string
    @Column({nullable:true})
    secondName: string
    @Column({nullable:true})
    lastName: string
    @Column({default:0})
    roleId:number
}