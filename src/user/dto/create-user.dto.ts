import {Column, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsNumber, IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    email: string
    @IsString()
    password: string
}
export class LoginUserDto extends CreateUserDto{}
