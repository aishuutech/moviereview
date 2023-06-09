import { InputType, Field, Int } from "@nestjs/graphql";
import { Max, Min } from "class-validator";

@InputType()
export class PaginationParamsDto {
    @Field(()=>Int, {defaultValue : 0})
    @Min(0)
    skip : number;

    @Field(()=>Int)
    @Min(1)
    @Max(50)
    take : number;
}