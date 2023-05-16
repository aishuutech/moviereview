import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(()=>User)
export class UserResolver {
    constructor(
        private readonly userService : UserService,
        private readonly authService : AuthService
    ) {}

    @Mutation(()=> User, {name : 'signUp'})
    public async signUp(@Args('userDto') userDto : UserDto) : Promise<User> {
        return await this.userService.create(userDto);
    }

    @Query(()=> User, {name : 'getUser'})
    public async user(@Args('id') id : number) :Promise<User> {
        return await this.userService.findOneById(id);
    }

    @Mutation(()=> String, {name : "changePassword"})
    public async changePassword(@Args('changePasswordDto') changePasswordDto : ChangePasswordDto, @Context('req')req) : Promise<String> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 401) {
            throw new UnauthorizedException();
        }
        return await this.userService.changePassword(changePasswordDto,resp.emailId);
    }
}
