import { Field, InputType, Int } from "@nestjs/graphql";
import { IsDateString, IsNumber, IsString } from "class-validator";
import { ReviewDto } from "src/review/dto/review.dto";

@InputType()
export class MovieDto {
    @Field(()=>Int, {nullable : true})
    @IsNumber()
    id : number;

    @Field(()=> String)
    @IsString()
    movieName : string;

    @Field(()=> String)
    @IsString()
    description : string;

    @Field(()=> String)
    @IsString()
    directorName : string;

    @Field(()=>Date)
    @IsDateString()
    releaseDate : Date;

    @Field(()=>ReviewDto, {nullable : true})
    review : ReviewDto;
}