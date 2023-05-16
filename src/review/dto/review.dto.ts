import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsString, Max, Min } from "class-validator";
import { MovieDto } from "src/movie/dto/movie.dto";
import { UserDto } from "src/user/dto/user.dto";

@InputType()
export class ReviewDto {
    @Field(()=>Int, {nullable : true})
    @IsNumber()
    id : number;

    @Field(()=> UserDto, {nullable : true})
    user : UserDto;

    @Field(()=> MovieDto,{nullable : true})
    movie : MovieDto;

    @Field(()=> Int)
    @IsNumber()
    @Min(1)
    @Max(10)
    rating : number;

    @Field(()=>String)
    @IsString()
    comment : string;
}