import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, isEmail } from "class-validator";
import { ReviewDto } from "src/review/dto/review.dto";

@InputType()
export class UserDto {
    @Field(()=>Int,{nullable : true})
    @IsNumber()
    id : number;

    @Field(()=> String)
    @IsString()
    userName : string;

    @Field(()=> String)
    @IsEmail()
    emailId : string;

    @Field(()=> String)
    @IsNotEmpty()
    @IsStrongPassword()
    password : string;

    @Field(()=>[ReviewDto], {nullable : true, defaultValue : null})
    review : ReviewDto[];
}