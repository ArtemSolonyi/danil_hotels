import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto, LoginUserDto} from './dto/create-user.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/register')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Post('/login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.userService.loginUser(loginUserDto);
    }
    @Patch('/refresh-token')
    refreshToken(@Body('refreshToken') refreshToken: string) {
        return this.userService.refreshTokens(refreshToken);
    }

}
