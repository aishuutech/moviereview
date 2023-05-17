import { Module } from '@nestjs/common';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ReviewResolver, ReviewService,PrismaService, AuthService, UserService,JwtService,ConfigService]
})
export class ReviewModule {}
