import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response.dto';
import { LoginDto } from './dto/login.input.dto';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService : AuthService
    ) {}

    @Mutation(()=> LoginResponse, {name : 'login'})
    async login(@Args('loginDto') loginDto : LoginDto) {
        return await this.authService.login(loginDto)
    }
}
