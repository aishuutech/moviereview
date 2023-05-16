import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { ReviewDto } from "./review.dto";

@InputType()
export class UpdateReviewDto extends PartialType(ReviewDto) {
    @Field(() => Int, {nullable : true})
    id: number;
}