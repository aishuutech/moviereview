import { Module } from '@nestjs/common';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MovieResolver, MovieService, PrismaService, UserService, AuthService,JwtService,ConfigService]
})
export class MovieModule {}
