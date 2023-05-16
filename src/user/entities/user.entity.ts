import { Field, Int, ObjectType } from '@nestjs/graphql';
import 'reflect-metadata'
import { Review } from 'src/review/entities/review.entity';

@ObjectType()
export class User {
    @Field(()=> Int)
    id : number;

    @Field(()=> String)
    userName : string;

    @Field(()=> String)
    emailId : string;

    @Field(()=> String)
    password : string;

    @Field(()=>Review, {nullable : true})
    review ?: Review;
}