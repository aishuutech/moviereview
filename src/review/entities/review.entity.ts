import { Field, Int, ObjectType } from '@nestjs/graphql';
import 'reflect-metadata'
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Review {
    @Field(()=>Int)
    id : number;

    @Field(()=> User,{nullable : true})
    user ?: User;

    @Field(()=> Movie,{nullable : true})
    movie ?: Movie;

    @Field(()=> Int)
    rating : number;

    @Field(()=>String)
    comment : string;
}