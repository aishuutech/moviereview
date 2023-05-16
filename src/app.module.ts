import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver : ApolloDriver,
      installSubscriptionHandlers : true,
      autoSchemaFile : 'schema.gql',
      uploads : false,
      debug : true,
      playground : true,
      context : ({req,res}) => ({req, res}),
      cors : true,
    }),
    UserModule,
    ReviewModule,
    MovieModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
