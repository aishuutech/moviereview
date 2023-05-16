import { Field, Int, ObjectType } from '@nestjs/graphql';
import 'reflect-metadata'
import { Review } from 'src/review/entities/review.entity';

@ObjectType()
export class Movie {
    @Field(()=>Int)
    id : number;

    @Field(()=> String)
    movieName : string;

    @Field(()=> String)
    description : string;

    @Field(()=> String)
    directorName : string;

    @Field(()=>Date)
    releaseDate : Date;

    @Field(()=>Review, {nullable : true})
    review ?: Review;
}