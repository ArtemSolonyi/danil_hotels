import {
    CanActivate,
    createParamDecorator,
    ExecutionContext,
    Injectable,
    NestMiddleware,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import * as dotenv from "dotenv"
dotenv.config()
@Injectable()
export class UserGuard implements CanActivate {

    constructor(private jwtService: JwtService, private config: ConfigService) {
    }


    canActivate(ctx: ExecutionContext): boolean {
        const req = ctx.switchToHttp().getRequest()
        console.log(req.headers)
        try {
            const token = req.headers.authorization
            console.log(token,'token')
            console.log(this.config,'config')
            console.log(this.config.get('SECRET_KEY_AUTH'),'1')
            const user = this.jwtService.verify(token, {secret: this.config.get('SECRET_KEY_AUTH')})
            console.log(user,'user')
            req.userId = user.userId
            return true
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }
}

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userId;
});