import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { MovieDto } from "./movie.dto";

@InputType()
export class UpdateMovieDto extends PartialType(MovieDto) {
    @Field(() => Int, {nullable : true})
    id: number;
}