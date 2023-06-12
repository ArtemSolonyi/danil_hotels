import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto, LoginUserDto} from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from "bcryptjs";


type PayloadToken = { userId: number, email: string ,roleId:number}
type Tokens = { accessToken: string, refreshToken: string }
type UserData = { email: string, accessToken: string, refreshToken: string ,roleId?:number}

const enum Roles {
    DEFAULT = 0,
    ADMIN = 1
}

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                private config: ConfigService,
                private jwtService: JwtService) {
    }


    createTokens(payload: PayloadToken): Tokens {
        const accessToken = this.jwtService.sign(payload, {secret: this.config.get('SECRET_KEY_AUTH'), expiresIn: '1d'})
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.config.get('SECRET_KEY_AUTH'),
            expiresIn: '30d'
        })
        return {accessToken, refreshToken}
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserData> {
        const {email} = createUserDto
        let roleId = Roles.DEFAULT
        const findUser = await this.userRepository.findOne({where: {email}})
        if (findUser) {
            throw  new ConflictException("User already exist")
        }
        const password = await bcrypt.hash(createUserDto.password, bcrypt.genSaltSync(5));
        console.log((await this.userRepository.find()),'(await this.userRepository.find())')
        if ((await this.userRepository.find()).length == 0) {
            roleId = Roles.ADMIN
        }
        const {id} = await this.userRepository.save(this.userRepository.create({password, email,roleId}))
        return {email, ...this.createTokens({userId: id, email,roleId}),roleId}
    }

    async loginUser({password, email}: LoginUserDto): Promise<UserData> {
        const findUser = await this.userRepository.findOne({where: {email}, select: ['password', 'id','roleId']})
        if (!findUser) {
            throw  new NotFoundException("User not exist")
        }
        if (!await bcrypt.compare(password, findUser.password)) {
            throw  new ConflictException("Password don't compare")
        }
        return {email, ...this.createTokens({email, userId: findUser.id,roleId:findUser.roleId}),roleId:findUser.roleId}
    }

    async refreshTokens(refreshToken: string): Promise<Omit<UserData, 'email'>> {
        try {
            const {
                userId,
                email,roleId
            } = this.jwtService.verify(refreshToken, {secret: this.config.get('SECRET_KEY_AUTH')}) as PayloadToken
            return {...this.createTokens({userId, email,roleId}),roleId}
        } catch (e) {
            throw new BadRequestException("Expired token")
        }
    }
}
