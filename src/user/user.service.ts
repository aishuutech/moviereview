import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(PrismaService) private prismaService : PrismaService
    ) {}

    async create(userDto : UserDto) : Promise<User> {
        userDto.password = bcrypt.hashSync(userDto.password,8); 
        return await this.prismaService.user.create({
            data : {
                userName : userDto.userName,
                emailId : userDto.emailId,
                password : userDto.password,
            }
        });
    }

    async findOneById( id : number) : Promise<User> {
        const user =  await this.prismaService.user.findUnique({
            where : {
                id : id
            }
        });
        if(!user) {
            throw new NotFoundException();
        }
        return user;
    }

    async findOneByEmail( emailId : string) : Promise<User> {
        const user =  await this.prismaService.user.findUnique({
            where : {
                emailId : emailId
            }
        });
        if(!user) {
            throw new NotFoundException();
        }
        return user;
    }

    async changePassword( changePasswordDto : ChangePasswordDto, emailId : string) : Promise<String> {
        if(changePasswordDto.oldPassword != changePasswordDto.newPassword) {
            if(changePasswordDto.newPassword === changePasswordDto.confirmPassword) {
                const user = await this.findOneByEmail(emailId);
                const password = bcrypt.hashSync(changePasswordDto.newPassword,8);
                const userId = user.id;
                await this.prismaService.user.update({
                    where : {
                        id : userId
                    },
                    data : {
                        password : password
                    }
                });
                return 'Password updated successfully!!';
            }
            else {
                return 'new password and confirm password is not same';
            }
        }
        return 'old password and new password is same.. Please enter different password!!!';
    }

    async update(id : number, updateUserDto : UpdateUserDto) : Promise<User> {
        return await this.prismaService.user.update({
            where : {
                id : id
            },
            data : {
                userName : updateUserDto.userName,
                emailId : updateUserDto.emailId,
            }
        });
    }
}
