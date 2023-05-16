import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.input.dto';
import { LoginResponse } from './dto/login.response.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ValidationResponse } from './dto/validation.response.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService
    ) {}

    async login(loginDto : LoginDto) :Promise<LoginResponse> {
        const user = await this.userService.findOneByEmail(loginDto.emailId);
        const validpwd = await bcrypt.compare(loginDto.password,user.password);
        if(validpwd && user) {
            const { password, ...result } = user;
            const payload = {
                emailId : user.emailId,
                sub : user.id,
            };
            return {
                accessToken : this.jwtService.sign(payload, {secret : this.configService.get('JWT_SECRET'), expiresIn : this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}),
                user : user,
            };
        }
        else {
            throw new Error("Please check your emailId and password!!");
        }
    }

    async validateToken(token : string) : Promise<ValidationResponse> {
        try {
            token = token.trim();
            const claims = this.jwtService.verify(token, {
                secret : this.configService.get('JWT_SECRET')
            });
            const user = await this.userService.findOneByEmail(claims.emailId);
            if(!user) {
                return {
                    status : 401,
                    userId : null,
                    emailId : null,
                    error : 'Unauthorized'
                };
            }
            else {
                return {
                    status : 200,
                    userId : claims.sub,
                    emailId : claims.emailId,
                    error : null
                };
            }
        }
        catch(TokenExpiredError) {
            return {
                status : 401,
                userId : null,
                emailId : null,
                error :"Unauthorized"
            }
        }
    }
}
